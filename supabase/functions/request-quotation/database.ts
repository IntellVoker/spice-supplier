import type { ValidatedInquiry, SavedInquiry } from './types.ts';
import { getServiceClient } from './supabaseClient.ts';
import { logError } from './logger.ts';

export type DbResult =
  | { ok: true; inquiry: SavedInquiry }
  | { ok: false; error: string };

export async function insertInquiry(
  data: ValidatedInquiry,
  ipAddress: string | null,
  userAgent: string | null
): Promise<DbResult> {
  try {
    const supabase = getServiceClient();
    const row = {
      company_name: data.companyName,
      contact_person: data.contactPerson,
      email: data.email,
      phone: data.phone,
      country: data.country,
      industry: data.industry,
      product: data.product,
      quantity: data.quantity,
      packaging: data.packaging,
      incoterm: data.incoterm,
      destination_port: data.destinationPort,
      delivery_date: data.deliveryDate,
      notes: data.notes,
      ip_address: ipAddress,
      user_agent: userAgent,
    };

    const { data: inserted, error } = await supabase
      .from('export_inquiries')
      .insert(row)
      .select('id, created_at, status')
      .single();

    if (error) {
      logError('Database insert failed', { error: error.message });
      return { ok: false, error: 'Server temporarily unavailable. Please try again in a few minutes.' };
    }

    return { ok: true, inquiry: inserted as SavedInquiry };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown database error';
    logError('Database exception', { error: msg });
    return { ok: false, error: 'Server temporarily unavailable. Please try again in a few minutes.' };
  }
}
