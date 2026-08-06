import type { RFQPayload, ValidatedInquiry } from './types.ts';
import { asString, sanitizeText, sanitizeMultiline, stripControlChars } from './sanitizer.ts';

export type ValidationResult =
  | { ok: true; data: ValidatedInquiry }
  | { ok: false; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s\-()]+$/;

const MAX = {
  company: 200,
  contact: 150,
  email: 254,
  phone: 30,
  country: 100,
  industry: 100,
  product: 150,
  otherProduct: 150,
  quantity: 100,
  incoterm: 20,
  port: 150,
  packaging: 200,
  delivery: 100,
  notes: 4000,
};

export function validate(payload: RFQPayload): ValidationResult {
  const errors: Record<string, string> = {};

  // Honeypot — if filled, silently reject (bot). Don't reveal why.
  if (asString(payload.website).trim() !== '') {
    return { ok: false, errors: { _form: 'Server temporarily unavailable. Please try again in a few minutes.' } };
  }

  const companyName = stripControlChars(sanitizeText(asString(payload.companyName), MAX.company));
  const contactPerson = stripControlChars(sanitizeText(asString(payload.contactPerson), MAX.contact));
  const email = sanitizeText(asString(payload.email), MAX.email).toLowerCase();
  const phone = sanitizeText(asString(payload.phone), MAX.phone);
  const country = stripControlChars(sanitizeText(asString(payload.country), MAX.country));
  const industry = stripControlChars(sanitizeText(asString(payload.industry), MAX.industry));
  const product = sanitizeText(asString(payload.interestedProduct), MAX.product);
  const otherProductName = stripControlChars(sanitizeText(asString(payload.otherProductName), MAX.otherProduct));
  const quantity = sanitizeText(asString(payload.requiredQuantity), MAX.quantity);
  const incoterm = sanitizeText(asString(payload.preferredIncoterm), MAX.incoterm);
  const destinationPort = stripControlChars(sanitizeText(asString(payload.destinationPort), MAX.port));
  const packaging = stripControlChars(sanitizeText(asString(payload.packagingRequest), MAX.packaging));
  const deliveryDate = sanitizeText(asString(payload.deliveryDate), MAX.delivery);
  const notes = sanitizeMultiline(asString(payload.additionalNotes), MAX.notes);

  if (!companyName) errors.companyName = 'Company Name is required.';
  if (!contactPerson) errors.contactPerson = 'Contact Person is required.';
  if (!country) errors.country = 'Country is required.';
  if (!industry) errors.industry = 'Industry is required.';

  if (!email) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'Invalid email address.';
  }

  if (!phone) {
    errors.phone = 'Phone / WhatsApp is required.';
  } else if (!PHONE_RE.test(phone) || phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'Invalid phone number.';
  }

  if (!product) {
    errors.interestedProduct = 'Product is required.';
  } else if (product === 'other' && !otherProductName) {
    errors.otherProductName = 'Please specify the product name.';
  }

  if (!quantity) errors.requiredQuantity = 'Quantity is required.';
  if (!incoterm) errors.preferredIncoterm = 'Shipping term is required.';
  if (!destinationPort) errors.destinationPort = 'Destination Port is required.';

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const resolvedProduct = product === 'other' ? `Other — ${otherProductName}` : product;

  return {
    ok: true,
    data: {
      contactPerson,
      email,
      companyName,
      country,
      industry,
      phone,
      product: resolvedProduct,
      quantity,
      incoterm,
      destinationPort,
      packaging,
      deliveryDate,
      notes,
    },
  };
}
