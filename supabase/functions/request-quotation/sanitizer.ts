// Input sanitization — server-side only, the browser is never trusted.
// These functions prepare user input for safe storage and HTML email rendering.

// Coerce any JSON-parsed value to a trimmed string. Handles numbers, null,
// objects, and arrays safely — JSON.parse can return anything.
export function asString(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return '';
  return String(value);
}

// Trim, collapse whitespace, and cap length for single-line database fields.
export function sanitizeText(value: string, maxLen = 2000): string {
  return value.trim().replace(/\s+/g, ' ').slice(0, maxLen);
}

// Trim and cap length for multi-line fields (notes). Preserves line breaks.
export function sanitizeMultiline(value: string, maxLen = 4000): string {
  return value.trim().slice(0, maxLen);
}

// Strip CR/LF control characters to prevent email header injection.
// Applied to any value that ends up in an email Subject or From header.
export function stripControlChars(value: string): string {
  return value.replace(/[\r\n]/g, ' ').replace(/\s+/g, ' ').trim();
}

// Escape HTML entities for safe output in HTML email bodies.
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
