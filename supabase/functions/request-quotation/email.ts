import type { ValidatedInquiry, SavedInquiry } from './types.ts';
import { escapeHtml, stripControlChars } from './sanitizer.ts';
import { logError } from './logger.ts';

// Company identity is configuration, not code. These must stay in step with
// src/data/company.ts (the frontend source of truth) and the index.html JSON-LD.
// Override per environment so identity changes never require a redeploy.
const COMPANY = {
  name: Deno.env.get('COMPANY_NAME') ?? 'Spice Supplier Indonesia',
  tagline: Deno.env.get('COMPANY_TAGLINE') ?? 'Premium Spices • Trusted Worldwide',
  email: Deno.env.get('COMPANY_EMAIL') ?? 'spicesupplierindonesia@gmail.com',
  phone: Deno.env.get('COMPANY_PHONE') ?? '+62 851 6117 0335',
  address: Deno.env.get('COMPANY_ADDRESS') ?? 'Jl. KH. Abdul Hamid, Ploso, Kec. Wonoayu, Kab. Sidoarjo, Prov. Jawa Timur, Indonesia 61261',
};

function emailShell(innerHtml: string): string {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${COMPANY.name}</title></head>
<body style="margin:0;padding:0;background-color:#f4f1ec;font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f1ec;padding:32px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
<tr><td style="background-color:#1a3c34;padding:28px 40px;text-align:center;">
<p style="margin:0;color:#fff;font-size:20px;font-weight:600;letter-spacing:1px;">${COMPANY.name}</p>
<p style="margin:8px 0 0;color:#d4a946;font-size:13px;letter-spacing:1px;text-transform:uppercase;">${COMPANY.tagline}</p>
</td></tr>
<tr><td style="padding:36px 40px;">${innerHtml}</td></tr>
<tr><td style="background-color:#f9f7f2;padding:24px 40px;border-top:1px solid #e8e2d6;">
<p style="margin:0 0 8px;color:#5a5a5a;font-size:13px;line-height:1.6;"><strong style="color:#1a3c34;">${COMPANY.name}</strong><br/>${COMPANY.address}<br/>${COMPANY.phone} &nbsp;|&nbsp; ${COMPANY.email}</p>
<p style="margin:8px 0 0;color:#999;font-size:12px;">&copy; ${year} ${COMPANY.name}. All rights reserved.</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  const display = value && value.trim() ? escapeHtml(value) : '-';
  return `<tr><td style="padding:8px 0;vertical-align:top;width:180px;color:#8a8a8a;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">${label}</td><td style="padding:8px 0;vertical-align:top;color:#333;font-size:14px;line-height:1.5;">${display}</td></tr>`;
}

export function buildNotificationEmail(data: ValidatedInquiry, inquiry: SavedInquiry): string {
  const submittedAt = new Date(inquiry.created_at).toLocaleString('en-US', {
    timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  });

  const inner = `
<h1 style="margin:0 0 8px;color:#1a3c34;font-size:22px;font-weight:600;">New Export Inquiry</h1>
<p style="margin:0 0 24px;color:#888;font-size:13px;">Submitted ${submittedAt} (UTC)</p>
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
${row('Company Name', data.companyName)}
${row('Contact Person', data.contactPerson)}
${row('Email', data.email)}
${row('Phone / WhatsApp', data.phone)}
${row('Country', data.country)}
${row('Industry', data.industry)}
${row('Product', data.product)}
${row('Quantity', data.quantity)}
${row('Packaging', data.packaging)}
${row('Incoterm', data.incoterm)}
${row('Destination Port', data.destinationPort)}
${row('Target Delivery', data.deliveryDate)}
${row('Notes', data.notes)}
</table>
<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;"><tr><td align="center">
<a href="mailto:${encodeURIComponent(data.email)}?subject=Re: Your Export Inquiry&body=Dear ${encodeURIComponent(data.contactPerson)},%0A%0AThank you for your inquiry.%0A%0A" style="display:inline-block;background-color:#1a3c34;color:#fff;text-decoration:none;padding:14px 36px;border-radius:8px;font-size:14px;font-weight:600;">Reply to Buyer</a>
</td></tr></table>
<p style="margin:20px 0 0;color:#aaa;font-size:12px;text-align:center;">Inquiry ID: ${escapeHtml(inquiry.id)}</p>`;

  return emailShell(inner);
}

export function buildAutoReplyEmail(data: ValidatedInquiry, inquiry: SavedInquiry): string {
  const inner = `
<h1 style="margin:0 0 16px;color:#1a3c34;font-size:22px;font-weight:600;">Thank You for Your Inquiry</h1>
<p style="margin:0 0 16px;color:#333;font-size:15px;line-height:1.6;">Dear ${escapeHtml(data.contactPerson)},</p>
<p style="margin:0 0 16px;color:#333;font-size:15px;line-height:1.6;">Thank you for contacting ${COMPANY.name}.</p>
<p style="margin:0 0 16px;color:#333;font-size:15px;line-height:1.6;">We have successfully received your inquiry.</p>
<p style="margin:0 0 16px;color:#333;font-size:15px;line-height:1.6;">Our team will review your request and respond as soon as possible.</p>
<p style="margin:0 0 16px;color:#333;font-size:15px;line-height:1.6;">We appreciate your interest in building a long-term business relationship with us.</p>
<p style="margin:24px 0 0;color:#333;font-size:15px;line-height:1.6;">Best Regards,<br/><strong style="color:#1a3c34;">${COMPANY.name}</strong></p>
<hr style="margin:28px 0;border:none;border-top:1px solid #e8e2d6;"/>
<p style="margin:0;color:#aaa;font-size:12px;">Your inquiry details have been recorded. Reference: ${escapeHtml(inquiry.id)}</p>`;

  return emailShell(inner);
}

// Subject lines strip control chars to prevent email header injection.
export function buildNotificationSubject(data: ValidatedInquiry): string {
  const company = stripControlChars(data.companyName).slice(0, 100);
  const country = stripControlChars(data.country).slice(0, 50);
  return `New Export Inquiry - ${company} - ${country}`;
}

export function buildAutoReplySubject(): string {
  return 'Thank You for Your Inquiry';
}

export type EmailResult = { ok: true } | { ok: false; error: string };

async function sendOne(
  apiKey: string,
  from: string,
  to: string,
  subject: string,
  html: string
): Promise<EmailResult> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: [to], subject, html }),
    });
    if (!res.ok) {
      const text = await res.text();
      // Don't log the recipient address (PII). Log status and truncated body only.
      logError('Email send failed', { status: res.status, body: text.slice(0, 200) });
      return { ok: false, error: `Email service error (${res.status})` };
    }
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown email error';
    logError('Email exception', { error: msg });
    return { ok: false, error: msg };
  }
}

export async function sendInquiryEmails(
  data: ValidatedInquiry,
  inquiry: SavedInquiry
): Promise<{ notification: EmailResult; autoReply: EmailResult }> {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  const fromEmail = Deno.env.get('FROM_EMAIL') ?? 'inquiries@spicesupplierindonesia.com';

  if (!apiKey) {
    logError('RESEND_API_KEY not configured — emails skipped');
    return {
      notification: { ok: false, error: 'Email service not configured' },
      autoReply: { ok: false, error: 'Email service not configured' },
    };
  }

  const notification = await sendOne(
    apiKey,
    fromEmail,
    COMPANY.email,
    buildNotificationSubject(data),
    buildNotificationEmail(data, inquiry)
  );

  const autoReply = await sendOne(
    apiKey,
    fromEmail,
    data.email,
    buildAutoReplySubject(),
    buildAutoReplyEmail(data, inquiry)
  );

  return { notification, autoReply };
}
