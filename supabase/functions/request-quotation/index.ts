import type { RFQPayload, ApiResponse } from './types.ts';
import { validate } from './validator.ts';
import { insertInquiry } from './database.ts';
import { sendInquiryEmails } from './email.ts';
import { buildWhatsAppMessage, buildWhatsAppUrl } from './whatsapp.ts';
import { checkRateLimit } from './rateLimiter.ts';
import { logInfo, logError } from './logger.ts';

// Restrict CORS to known origins. An unset or empty ALLOWED_ORIGINS is a
// misconfiguration, not a development mode: the function refuses to serve
// rather than becoming world-open.
const ALLOWED_ORIGINS = (Deno.env.get('ALLOWED_ORIGINS') ?? '').split(',').map((s) => s.trim()).filter(Boolean);
const ORIGINS_CONFIGURED = ALLOWED_ORIGINS.length > 0;

if (ORIGINS_CONFIGURED) {
  logInfo('CORS allowlist loaded', { allowedOrigins: ALLOWED_ORIGINS });
} else {
  logError('ALLOWED_ORIGINS is not set — refusing all requests. Set it to the exact site origins, comma-separated.');
}

function corsOrigin(req: Request): string {
  const origin = req.headers.get('origin') ?? '';
  return ORIGINS_CONFIGURED && ALLOWED_ORIGINS.includes(origin) ? origin : 'null';
}

const corsHeaders = (req: Request) => ({
  'Access-Control-Allow-Origin': corsOrigin(req),
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
  'Access-Control-Max-Age': '86400',
});

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
};

const MAX_BODY_BYTES = 32 * 1024; // 32 KB — generous for this form

function json(body: ApiResponse, status: number, req: Request): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(req), ...securityHeaders, 'Content-Type': 'application/json' },
  });
}

function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return '0.0.0.0';
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(req) });
  }

  if (req.method !== 'POST') {
    return json({ success: false, message: 'Method not allowed.' }, 405, req);
  }

  if (!ORIGINS_CONFIGURED) {
    logError('Request rejected: ALLOWED_ORIGINS is not configured');
    return json({ success: false, message: 'Server temporarily unavailable. Please try again in a few minutes.' }, 503, req);
  }

  const clientIp = getClientIp(req);
  const userAgent = req.headers.get('user-agent');
  const truncatedUserAgent = userAgent ? userAgent.slice(0, 500) : null;

  try {
    // Reject oversized bodies before parsing
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
      return json({ success: false, message: 'Request body too large.' }, 413, req);
    }

    // Read body with a hard cap
    const rawBody = await req.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return json({ success: false, message: 'Request body too large.' }, 413, req);
    }

    let payload: RFQPayload;
    try {
      payload = JSON.parse(rawBody) as RFQPayload;
    } catch {
      return json({ success: false, message: 'Invalid JSON payload.' }, 400, req);
    }

    // 1. Validate + sanitize. This runs before the rate limiter so that a buyer
    // correcting a typo never spends their submission budget.
    const validation = validate(payload);
    if (!validation.ok) {
      logInfo('Validation failed', { errors: validation.errors });
      return json({ success: false, message: 'Please correct the errors below.', errors: validation.errors }, 400, req);
    }

    const data = validation.data;

    // 2. Rate limit check — only valid attempts are counted
    const rateLimit = await checkRateLimit(clientIp);
    if (!rateLimit.ok) {
      return json({ success: false, message: rateLimit.error }, 429, req);
    }

    // 3. Insert into database (service role only)
    const dbResult = await insertInquiry(data, clientIp, truncatedUserAgent);
    if (!dbResult.ok) {
      logError('Database save failed', { error: dbResult.error });
      return json({ success: false, message: dbResult.error }, 500, req);
    }

    const inquiry = dbResult.inquiry;
    logInfo('Inquiry saved', { inquiryId: inquiry.id });

    // 4. Send emails (best-effort — does not block success)
    const emails = await sendInquiryEmails(data, inquiry);
    if (!emails.notification.ok) {
      logError('Notification email failed', { inquiryId: inquiry.id, error: emails.notification.error });
    }
    if (!emails.autoReply.ok) {
      logError('Auto-reply email failed', { inquiryId: inquiry.id, error: emails.autoReply.error });
    }

    // 5. Generate WhatsApp URL (returned to browser to open)
    const whatsappUrl = buildWhatsAppUrl(buildWhatsAppMessage(data));

    // 6. Success — even if email failed, the inquiry is saved
    const emailFailed = !emails.notification.ok && !emails.autoReply.ok;
    const message = emailFailed
      ? 'Your inquiry has been received successfully. Our team will contact you shortly.'
      : 'Your quotation request has been successfully submitted. Our export team will review your inquiry and contact you as soon as possible.';

    return json({ success: true, message, whatsappUrl }, 200, req);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown server error';
    logError('API exception', { error: msg });
    return json({ success: false, message: 'Server temporarily unavailable. Please try again in a few minutes.' }, 500, req);
  }
});
