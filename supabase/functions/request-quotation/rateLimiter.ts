import { getServiceClient } from './supabaseClient.ts';
import { logError, logInfo } from './logger.ts';

// Rate limiting — durable, server-side, stored in the database.
// Edge function instances do not share memory, so we use a table.
// Limit: 5 submissions per IP hash within 10 minutes.

const MAX_SUBMISSIONS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

// Hash the IP with SHA-256 so we never store raw IPs in the rate-limit table.
async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export type RateLimitResult =
  | { ok: true }
  | { ok: false; error: string };

export async function checkRateLimit(ipAddress: string): Promise<RateLimitResult> {
  try {
    const supabase = getServiceClient();
    const ipHash = await hashIp(ipAddress);
    const windowStart = new Date(Date.now() - WINDOW_MS).toISOString();

    const { count, error } = await supabase
      .from('rfq_rate_limits')
      .select('id', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', windowStart);

    if (error) {
      logError('Rate limit check failed', { error: error.message });
      // Fail open — don't block legitimate submissions if the rate-limit check errors
      return { ok: true };
    }

    if ((count ?? 0) >= MAX_SUBMISSIONS) {
      logInfo('Rate limit exceeded', { ipHash, count });
      return {
        ok: false,
        error: 'Too many submissions. Please try again in a few minutes.',
      };
    }

    const { error: insertError } = await supabase
      .from('rfq_rate_limits')
      .insert({ ip_hash: ipHash });

    if (insertError) {
      logError('Rate limit insert failed', { error: insertError.message });
    }

    // Clean up old rows (older than 1 hour) to keep the table small
    const cleanupBefore = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    await supabase.from('rfq_rate_limits').delete().lt('created_at', cleanupBefore);

    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown rate limit error';
    logError('Rate limit exception', { error: msg });
    // Fail open
    return { ok: true };
  }
}
