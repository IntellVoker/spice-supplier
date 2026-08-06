/*
# Create export_inquiries table for RFQ / CRM lead management

1. New Tables
- `export_inquiries`
  - `id` (uuid, primary key, auto-generated)
  - `created_at` (timestamptz, defaults to now)
  - `company_name` (text, required — buyer's company)
  - `contact_person` (text, required — buyer's name)
  - `email` (text, required — buyer's email)
  - `phone` (text, required — phone/WhatsApp)
  - `country` (text, required — buyer's country)
  - `industry` (text — buyer's industry sector)
  - `product` (text, required — product of interest)
  - `quantity` (text — required quantity as free text)
  - `packaging` (text — preferred packaging)
  - `incoterm` (text — preferred shipping term, e.g. FOB/CFR/CIF)
  - `destination_port` (text — destination port name)
  - `delivery_date` (text — target delivery date as free text)
  - `notes` (text — additional requirements / notes)
  - `status` (text, defaults to 'New' — CRM pipeline status)

2. Status Workflow (enforced by CHECK constraint)
  - New (default)
  - Contacted
  - Quotation Sent
  - Negotiation
  - PO Received
  - Closed Won
  - Closed Lost

3. Security
  - Enable RLS on export_inquiries.
  - This is a no-auth public website. The frontend uses the anon key to INSERT new inquiries (public submission). Reads/updates/deletes are NOT allowed via anon — those are reserved for a future authenticated admin/CRM dashboard.
  - INSERT policy: TO anon, authenticated WITH CHECK (true) — anyone can submit an inquiry.
  - SELECT/UPDATE/DELETE: NO anon policies. Only authenticated admins (future CRM dashboard) will get policies when auth is added.

4. Indexes
  - `export_inquiries_status_idx` on `status` — filter by pipeline stage.
  - `export_inquiries_created_at_idx` on `created_at` — sort by newest.
  - `export_inquiries_email_idx` on `email` — dedup / lookup by buyer.

5. Important Notes
  - This table is the single source of truth for all RFQ submissions.
  - The reusable service layer (src/lib/rfq.ts) is the only code that writes to this table.
  - Future CRM dashboard will read/update this table with authenticated RLS policies.
  - The `status` column is the CRM pipeline field — it starts at 'New' and progresses through the workflow.
*/

CREATE TABLE IF NOT EXISTS export_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  company_name text NOT NULL,
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  country text NOT NULL,
  industry text DEFAULT '',
  product text NOT NULL,
  quantity text DEFAULT '',
  packaging text DEFAULT '',
  incoterm text DEFAULT '',
  destination_port text DEFAULT '',
  delivery_date text DEFAULT '',
  notes text DEFAULT '',
  status text NOT NULL DEFAULT 'New'
);

ALTER TABLE export_inquiries ENABLE ROW LEVEL SECURITY;

-- INSERT: public submission (no-auth website, anon key)
DROP POLICY IF EXISTS "anon_insert_inquiries" ON export_inquiries;
CREATE POLICY "anon_insert_inquiries"
ON export_inquiries FOR INSERT
TO anon, authenticated WITH CHECK (true);

-- SELECT/UPDATE/DELETE: reserved for future authenticated admin dashboard
-- No anon policies — anon key cannot read or modify inquiries.

-- Add CHECK constraint for valid statuses (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'export_inquiries_status_check'
  ) THEN
    ALTER TABLE export_inquiries
    ADD CONSTRAINT export_inquiries_status_check
    CHECK (status IN (
      'New',
      'Contacted',
      'Quotation Sent',
      'Negotiation',
      'PO Received',
      'Closed Won',
      'Closed Lost'
    ));
  END IF;
END $$;

-- Indexes for CRM dashboard queries
CREATE INDEX IF NOT EXISTS export_inquiries_status_idx ON export_inquiries (status);
CREATE INDEX IF NOT EXISTS export_inquiries_created_at_idx ON export_inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS export_inquiries_email_idx ON export_inquiries (email);
