/*
# Upgrade export_inquiries for secure CRM architecture

1. Schema Changes
- Add `ip_address` (inet, nullable) — the submitter's IP, captured server-side only.
- Add `user_agent` (text, nullable) — the submitter's browser user-agent.
- The `status` column CHECK constraint is replaced to support the expanded CRM pipeline:
  New Inquiry (new default), Contacted, Quotation Sent, Negotiation,
  Waiting Payment, Processing, Completed, Cancelled.
- Default for `status` changed from 'New' to 'New Inquiry'.

2. New Tables
- `rfq_rate_limits` — durable server-side rate-limit store (edge function instances do not share memory).
  - `id` (uuid, primary key)
  - `ip_hash` (text, required, indexed) — SHA-256 hash of the client IP (never store raw IP for rate limiting)
  - `created_at` (timestamptz, defaults to now, indexed) — when the attempt occurred
  - Index on (ip_hash, created_at) for fast window queries.

3. Security
- RLS remains ENABLED on export_inquiries (not disabled).
- INSERT policy for anon/authenticated remains (the edge function uses the service role, which bypasses RLS, but the policy is kept for completeness).
- rfq_rate_limits has RLS enabled with NO policies — only the service role (server) can read/write it. The anon key cannot touch it.

4. Important Notes
- The service-role key is NEVER sent to the browser. It lives only in the edge function environment.
- The browser now calls the edge function API, never the database directly.
- Rate limiting is enforced server-side via the rfq_rate_limits table (durable across edge function instances).
*/

-- Add ip_address and user_agent columns (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'export_inquiries' AND column_name = 'ip_address') THEN
    ALTER TABLE export_inquiries ADD COLUMN ip_address inet;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'export_inquiries' AND column_name = 'user_agent') THEN
    ALTER TABLE export_inquiries ADD COLUMN user_agent text;
  END IF;
END $$;

-- Update status default to 'New Inquiry'
ALTER TABLE export_inquiries ALTER COLUMN status SET DEFAULT 'New Inquiry';

-- Replace the status CHECK constraint with the expanded CRM pipeline
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'export_inquiries_status_check') THEN
    ALTER TABLE export_inquiries DROP CONSTRAINT export_inquiries_status_check;
  END IF;
  ALTER TABLE export_inquiries
    ADD CONSTRAINT export_inquiries_status_check
    CHECK (status IN (
      'New Inquiry',
      'Contacted',
      'Quotation Sent',
      'Negotiation',
      'Waiting Payment',
      'Processing',
      'Completed',
      'Cancelled'
    ));
END $$;

-- Rate-limit table (durable server-side store)
CREATE TABLE IF NOT EXISTS rfq_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE rfq_rate_limits ENABLE ROW LEVEL SECURITY;

-- No policies on rfq_rate_limits — only the service role can access it.

-- Indexes for rate-limit window queries
CREATE INDEX IF NOT EXISTS rfq_rate_limits_ip_hash_idx ON rfq_rate_limits (ip_hash);
CREATE INDEX IF NOT EXISTS rfq_rate_limits_ip_created_idx ON rfq_rate_limits (ip_hash, created_at DESC);

-- Clean up old rate-limit rows periodically is handled by the edge function (deletes old rows on each request).
