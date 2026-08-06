import type { ValidatedInquiry } from './types.ts';

// WhatsApp message formatter — reusable, human-readable, no JSON.
export function buildWhatsAppMessage(data: ValidatedInquiry): string {
  return [
    'NEW EXPORT INQUIRY',
    '',
    'Company:',
    data.companyName || '-',
    '',
    'Contact Person:',
    data.contactPerson,
    '',
    'Country:',
    data.country,
    '',
    'Industry:',
    data.industry || '-',
    '',
    'Email:',
    data.email,
    '',
    'Phone:',
    data.phone,
    '',
    'Interested Product:',
    data.product,
    '',
    'Quantity:',
    data.quantity || '-',
    '',
    'Packaging:',
    data.packaging || '-',
    '',
    'Preferred Incoterm:',
    data.incoterm,
    '',
    'Destination Port:',
    data.destinationPort || '-',
    '',
    'Target Delivery:',
    data.deliveryDate || '-',
    '',
    'Additional Notes:',
    data.notes || '-',
    '',
    'Submitted from:',
    'Spice Supplier Indonesia Website',
  ].join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  const whatsappNumber = Deno.env.get('WHATSAPP_NUMBER') ?? '6285161170335';
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
