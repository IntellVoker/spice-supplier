import { useState, useRef, useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';
import { locales, localeNames, type Locale } from '../lib/i18n';
import { GlobeIcon, ChevronDownIcon, CheckIcon } from './ui/Icons';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-dark/70 hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
      >
        <GlobeIcon size={18} />
        <span className="uppercase">{locale}</span>
        <ChevronDownIcon
          size={12}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          className="absolute right-0 mt-2 w-44 rounded-lg bg-white shadow-lg ring-1 ring-black/10 overflow-hidden z-50"
          role="listbox"
        >
          {locales.map((l: Locale) => (
            <li key={l}>
              <button
                onClick={() => {
                  setLocale(l);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                  locale === l
                    ? 'bg-primary/5 text-primary font-semibold'
                    : 'text-dark/70 hover:bg-cream hover:text-primary'
                }`}
                role="option"
                aria-selected={locale === l}
              >
                {localeNames[l]}
                {locale === l && <CheckIcon size={14} strokeWidth={2.5} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
