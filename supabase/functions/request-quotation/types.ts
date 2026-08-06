// Shared types for the Request Quotation API.
// Payload fields are `unknown` because JSON.parse can return any type;
// the validator coerces them to strings safely.

export interface RFQPayload {
  contactPerson?: unknown;
  email?: unknown;
  companyName?: unknown;
  country?: unknown;
  industry?: unknown;
  phone?: unknown;
  interestedProduct?: unknown;
  otherProductName?: unknown;
  requiredQuantity?: unknown;
  preferredIncoterm?: unknown;
  destinationPort?: unknown;
  packagingRequest?: unknown;
  deliveryDate?: unknown;
  additionalNotes?: unknown;
  website?: unknown;
}

export interface ValidatedInquiry {
  contactPerson: string;
  email: string;
  companyName: string;
  country: string;
  industry: string;
  phone: string;
  product: string;
  quantity: string;
  incoterm: string;
  destinationPort: string;
  packaging: string;
  deliveryDate: string;
  notes: string;
}

export interface SavedInquiry {
  id: string;
  created_at: string;
  status: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  whatsappUrl?: string;
  errors?: Record<string, string>;
}

export type LogLevel = 'info' | 'warn' | 'error';

export interface LogEntry {
  level: LogLevel;
  message: string;
  inquiryId?: string;
  meta?: Record<string, unknown>;
}
