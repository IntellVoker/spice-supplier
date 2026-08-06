/*
# Lock down export_inquiries — remove direct browser INSERT access

## Why
The previous architecture allowed the browser to INSERT directly into export_inquiries
via the anon key (the "anon_insert_inquiries" RLS policy). This bypassed all server-side
validation, sanitization, rate limiting, and email notification logic.

The new architecture routes all submissions through the `request-quotation` edge function,
which uses the service-role key. The service role bypasses RLS entirely, so it does not
need any RLS policies to function.

## Change
- DROP the "anon_insert_inquiries" policy.
- After this migration, export_inquiries has RLS enabled with NO policies.
  This means:
  - anon key: cannot SELECT, INSERT, UPDATE, or DELETE (all blocked by RLS)
  - authenticated key: same — no policies apply
  - service role: bypasses RLS entirely (used by the edge function only)

The table is now completely locked down. The only way to write to it is via the
edge function using the service-role key, which never leaves the server.

## Security impact
- The browser can no longer insert directly into the database.
- All submissions MUST go through the edge function API.
- Validation, sanitization, and rate limiting are now unavoidable.
*/

DROP POLICY IF EXISTS "anon_insert_inquiries" ON export_inquiries;

-- RLS remains enabled with no policies — table is locked to anon/authenticated.
-- Only the service role (server-side edge function) can write.
