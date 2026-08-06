export type Locale = 'en' | 'id';

export const locales: Locale[] = ['en', 'id'];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  id: 'Bahasa Indonesia',
};

export const localeFlags: Record<Locale, string> = {
  en: 'EN',
  id: 'ID',
};

export function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return defaultLocale;
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('id')) return 'id';
  return defaultLocale;
}

export function getStoredLocale(): Locale | null {
  if (typeof localStorage === 'undefined') return null;
  const stored = localStorage.getItem('locale');
  if (stored === 'en' || stored === 'id') return stored;
  return null;
}

export function setStoredLocale(locale: Locale) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('locale', locale);
}
