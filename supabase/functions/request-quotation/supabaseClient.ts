// Shared Supabase service-role client.
// Created once at module load — not per request.
// The service-role key bypasses RLS and lives only on the server.

import { createClient } from 'npm:@supabase/supabase-js@2';

let client: ReturnType<typeof createClient> | null = null;

export function getServiceClient(): ReturnType<typeof createClient> {
  if (client) return client;

  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !key) {
    throw new Error('Database credentials are not configured.');
  }

  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}
