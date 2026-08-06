// Thin API client — the browser ONLY talks to this endpoint.
// The browser never touches the database, never holds database credentials,
// and never sends the service-role key. All business logic is server-side.

export interface RFQFormData {
  contactPerson: string;
  email: string;
  companyName: string;
  country: string;
  industry: string;
  phone: string;
  interestedProduct: string;
  otherProductName: string;
  requiredQuantity: string;
  preferredIncoterm: string;
  destinationPort: string;
  packagingRequest: string;
  deliveryDate: string;
  additionalNotes: string;
  website: string;
}

export interface ApiResult {
  success: boolean;
  message: string;
  whatsappUrl?: string;
  errors?: Record<string, string>;
}

export async function submitQuotation(form: RFQFormData): Promise<ApiResult> {
  const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/request-quotation`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(form),
    });

    const data = (await response.json()) as ApiResult;

    if (!response.ok || !data.success) {
      return {
        success: false,
        message: data.message ?? 'Server temporarily unavailable. Please try again in a few minutes.',
        errors: data.errors,
      };
    }

    return data;
  } catch {
    return {
      success: false,
      message: 'Server temporarily unavailable. Please try again in a few minutes.',
    };
  }
}
