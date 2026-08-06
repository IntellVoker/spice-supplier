import { company } from '../data/company';
import { useI18n } from '../hooks/useI18n';

export default function Footer() {
  const { t } = useI18n();

  const companyLinks = [
    { label: t.footer.links.about, href: '#about' },
    { label: t.footer.links.whyUs, href: '#why-us' },
    { label: t.footer.links.process, href: '#process' },
    { label: t.footer.links.gallery, href: '#gallery' },
  ];

  return (
    <footer className="bg-primary text-white/80" aria-label="Footer">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-white/20"
              />
              <div className="leading-tight">
                <span className="block font-display text-lg font-semibold text-white">
                  {company.name}
                </span>
                <span className="block text-[11px] font-medium tracking-wide text-gold uppercase">
                  {company.tagline}
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">{t.footer.tagline}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              {t.footer.company}
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-gold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              {t.footer.productsTitle}
            </h4>
            <ul className="space-y-2.5">
              {t.footer.productLinks.map((label) => (
                <li key={label}>
                  <a href="#products" className="text-sm text-white/60 hover:text-gold transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>{company.address}</li>
              <li>
                <a href={`mailto:${company.email}`} className="hover:text-gold transition-colors">
                  {company.email}
                </a>
              </li>
              <li>
                <a href={`tel:${company.phone}`} className="hover:text-gold transition-colors">
                  {company.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {company.name}. {t.footer.rights}
          </p>
          <div className="flex gap-5 text-xs text-white/50">
            <a href="#" className="hover:text-gold transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-gold transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
