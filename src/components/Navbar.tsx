import { useState } from 'react';
import { company } from '../data/company';
import { useI18n } from '../hooks/useI18n';
import LanguageSwitcher from './LanguageSwitcher';
import { MenuIcon, CloseIcon } from './ui/Icons';

export default function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.values, href: '#values' },
    { label: t.nav.products, href: '#products' },
    { label: t.nav.whyUs, href: '#why-us' },
    { label: t.nav.process, href: '#process' },
    { label: t.nav.gallery, href: '#gallery' },
    { label: t.nav.faq, href: '#faq' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <nav className="container-page flex items-center justify-between h-20" aria-label="Main navigation">
        <a href="#home" className="flex items-center gap-3" aria-label={`${company.name} home`}>
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
          />
          <div className="hidden sm:block leading-tight">
            <span className="block font-display text-lg font-semibold text-primary">
              {company.name}
            </span>
            <span className="block text-[11px] font-medium tracking-wide text-gold uppercase">
              {company.tagline}
            </span>
          </div>
        </a>

        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-dark/70 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <a href="#contact" className="btn-primary">
            {t.nav.requestQuotation}
          </a>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label={open ? t.nav.closeMenu : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="lg:hidden border-t border-black/5 bg-white">
          <ul className="container-page py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-sm font-medium text-dark/70 hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                {t.nav.requestQuotation}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
