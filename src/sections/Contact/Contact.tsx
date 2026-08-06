import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle';
import { company } from '../../data/company';
import {
  productOptions,
  incotermOptions,
  otherProductId,
  defaultIncoterm,
} from '../../data/formOptions';
import { useI18n } from '../../hooks/useI18n';
import { CheckIcon, WhatsAppIcon, MailIcon, MapPinIcon } from '../../components/ui/Icons';
import { fadeInUp, viewportOnce } from '../../lib/motion';
import { submitQuotation, type RFQFormData } from '../../lib/rfq';

const initialForm: RFQFormData = {
  contactPerson: '',
  email: '',
  companyName: '',
  country: '',
  industry: '',
  phone: '',
  interestedProduct: '',
  otherProductName: '',
  requiredQuantity: '',
  preferredIncoterm: defaultIncoterm,
  destinationPort: '',
  packagingRequest: '',
  deliveryDate: '',
  additionalNotes: '',
  website: '',
};

const DUPLICATE_WINDOW_MS = 60_000;

export default function Contact() {
  const { t } = useI18n();
  const f = t.contact.form;
  const [form, setForm] = useState<RFQFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof RFQFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RFQFormData, string>> = {};
    if (!form.contactPerson.trim()) newErrors.contactPerson = f.required;
    if (!form.companyName.trim()) newErrors.companyName = f.required;
    if (!form.country.trim()) newErrors.country = f.required;
    if (!form.industry.trim()) newErrors.industry = f.required;
    if (!form.phone.trim()) {
      newErrors.phone = f.required;
    } else if (form.phone.replace(/[\s\-()+]/g, '').length < 7) {
      newErrors.phone = f.invalidPhone;
    }
    if (!form.email.trim()) {
      newErrors.email = f.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = f.invalidEmail;
    }
    if (!form.interestedProduct) newErrors.interestedProduct = f.selectProductError;
    if (form.interestedProduct === otherProductId && !form.otherProductName.trim()) {
      newErrors.otherProductName = f.required;
    }
    if (!form.requiredQuantity.trim()) newErrors.requiredQuantity = f.required;
    if (!form.preferredIncoterm) newErrors.preferredIncoterm = f.selectIncotermError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof RFQFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.website) return;
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const key = `lastRfq_${form.email}`;
      const last = localStorage.getItem(key);
      if (last && Date.now() - parseInt(last, 10) < DUPLICATE_WINDOW_MS) {
        setSubmitError(f.duplicateError);
        setSubmitting(false);
        return;
      }

      const result = await submitQuotation(form);
      if (!result.success) {
        if (result.errors) {
          setErrors(result.errors as Partial<Record<keyof RFQFormData, string>>);
          setSubmitError(result.message);
        } else {
          setSubmitError(result.message);
        }
        setSubmitting(false);
        return;
      }

      localStorage.setItem(key, Date.now().toString());

      setWhatsappUrl(result.whatsappUrl ?? null);
      setSubmitted(true);
    } catch {
      setSubmitError(f.submitError);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: keyof RFQFormData) =>
    `w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-all ${
      errors[field]
        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
        : 'border-black/10 focus:border-primary focus:ring-2 focus:ring-primary/20'
    }`;

  return (
    <section id="contact" className="py-24 lg:py-32" aria-label={t.contact.title}>
      <div className="container-page">
        <SectionTitle
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <div className="mt-14 grid lg:grid-cols-5 gap-10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="card-surface p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5">
                  <CheckIcon size={32} strokeWidth={2} />
                </div>
                <h3 className="font-display text-2xl font-semibold text-dark mb-2">{t.contact.success.title}</h3>
                <p className="text-dark/60 mb-4">{t.contact.success.message}</p>
                <p className="text-sm text-dark/50 mb-6">{t.contact.success.whatsappNote}</p>
                {whatsappUrl && (
                  <div className="mb-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <WhatsAppIcon size={18} />
                      {t.contact.success.whatsappCta}
                    </a>
                  </div>
                )}
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm(initialForm);
                    setWhatsappUrl(null);
                  }}
                  className="mt-2 text-sm font-semibold text-primary hover:text-primary-dark"
                >
                  {t.contact.success.another}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-surface p-8 space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contactPerson" className="block text-sm font-medium text-dark/70 mb-1.5">
                      {f.contactPerson}
                    </label>
                    <input
                      id="contactPerson"
                      name="contactPerson"
                      required
                      value={form.contactPerson}
                      onChange={handleChange}
                      placeholder={f.contactPersonPlaceholder}
                      className={inputClass('contactPerson')}
                      aria-invalid={!!errors.contactPerson}
                    />
                    {errors.contactPerson && (
                      <p className="mt-1 text-xs text-red-500">{errors.contactPerson}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-dark/70 mb-1.5">
                      {f.email}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass('email')}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-dark/70 mb-1.5">
                      {f.companyName}
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      required
                      value={form.companyName}
                      onChange={handleChange}
                      className={inputClass('companyName')}
                      aria-invalid={!!errors.companyName}
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-dark/70 mb-1.5">
                      {f.country}
                    </label>
                    <input
                      id="country"
                      name="country"
                      required
                      value={form.country}
                      onChange={handleChange}
                      className={inputClass('country')}
                      aria-invalid={!!errors.country}
                    />
                    {errors.country && (
                      <p className="mt-1 text-xs text-red-500">{errors.country}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-dark/70 mb-1.5">
                      {f.industry}
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      required
                      value={form.industry}
                      onChange={handleChange}
                      className={`${inputClass('industry')} bg-white`}
                      aria-invalid={!!errors.industry}
                    >
                      {f.industryOptions.map((opt) => (
                        <option key={opt} value={opt === f.industryOptions[0] ? '' : opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.industry && (
                      <p className="mt-1 text-xs text-red-500">{errors.industry}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-dark/70 mb-1.5">
                      {f.phone}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+62 ..."
                      className={inputClass('phone')}
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="interestedProduct" className="block text-sm font-medium text-dark/70 mb-1.5">
                      {f.interestedProduct}
                    </label>
                    <select
                      id="interestedProduct"
                      name="interestedProduct"
                      required
                      value={form.interestedProduct}
                      onChange={handleChange}
                      className={`${inputClass('interestedProduct')} bg-white`}
                      aria-invalid={!!errors.interestedProduct}
                    >
                      <option value="" disabled>{f.selectProduct}</option>
                      {productOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {f.productLabels[opt.id]}
                        </option>
                      ))}
                    </select>
                    {errors.interestedProduct && (
                      <p className="mt-1 text-xs text-red-500">{errors.interestedProduct}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="requiredQuantity" className="block text-sm font-medium text-dark/70 mb-1.5">
                      {f.requiredQuantity}
                    </label>
                    <input
                      id="requiredQuantity"
                      name="requiredQuantity"
                      required
                      value={form.requiredQuantity}
                      onChange={handleChange}
                      placeholder={f.quantityPlaceholder}
                      className={inputClass('requiredQuantity')}
                      aria-invalid={!!errors.requiredQuantity}
                    />
                    {errors.requiredQuantity && (
                      <p className="mt-1 text-xs text-red-500">{errors.requiredQuantity}</p>
                    )}
                  </div>
                </div>

                {form.interestedProduct === otherProductId && (
                  <div>
                    <label htmlFor="otherProductName" className="block text-sm font-medium text-dark/70 mb-1.5">
                      {f.otherProductName} *
                    </label>
                    <input
                      id="otherProductName"
                      name="otherProductName"
                      value={form.otherProductName}
                      onChange={handleChange}
                      placeholder={f.otherProductNamePlaceholder}
                      className={inputClass('otherProductName')}
                      aria-invalid={!!errors.otherProductName}
                    />
                    {errors.otherProductName && (
                      <p className="mt-1 text-xs text-red-500">{errors.otherProductName}</p>
                    )}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="preferredIncoterm" className="block text-sm font-medium text-dark/70 mb-1.5">
                      {f.preferredIncoterm}
                    </label>
                    <select
                      id="preferredIncoterm"
                      name="preferredIncoterm"
                      required
                      value={form.preferredIncoterm}
                      onChange={handleChange}
                      className={`${inputClass('preferredIncoterm')} bg-white`}
                      aria-invalid={!!errors.preferredIncoterm}
                    >
                      {incotermOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {f.incotermLabels[opt.id]}
                        </option>
                      ))}
                    </select>
                    {errors.preferredIncoterm && (
                      <p className="mt-1 text-xs text-red-500">{errors.preferredIncoterm}</p>
                    )}
                    <p className="mt-1.5 text-xs text-dark/40 leading-relaxed">{f.incotermHelper}</p>
                  </div>
                  <div>
                    <label htmlFor="destinationPort" className="block text-sm font-medium text-dark/70 mb-1.5">
                      {f.destinationPort}
                    </label>
                    <input
                      id="destinationPort"
                      name="destinationPort"
                      value={form.destinationPort}
                      onChange={handleChange}
                      placeholder={f.portPlaceholder}
                      className={inputClass('destinationPort')}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="deliveryDate" className="block text-sm font-medium text-dark/70 mb-1.5">
                      {f.deliveryDate}
                    </label>
                    <input
                      id="deliveryDate"
                      name="deliveryDate"
                      value={form.deliveryDate}
                      onChange={handleChange}
                      placeholder={f.deliveryDatePlaceholder}
                      className={inputClass('deliveryDate')}
                    />
                  </div>
                  <div>
                    <label htmlFor="packagingRequest" className="block text-sm font-medium text-dark/70 mb-1.5">
                      {f.packagingRequest}
                    </label>
                    <input
                      id="packagingRequest"
                      name="packagingRequest"
                      value={form.packagingRequest}
                      onChange={handleChange}
                      placeholder={f.packagingPlaceholder}
                      className={inputClass('packagingRequest')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="additionalNotes" className="block text-sm font-medium text-dark/70 mb-1.5">
                    {f.additionalNotes}
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    rows={4}
                    value={form.additionalNotes}
                    onChange={handleChange}
                    placeholder={f.notesPlaceholder}
                    className={`${inputClass('additionalNotes')} resize-none`}
                  />
                </div>

                {/* Honeypot field — hidden from users, catches bots */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">{f.honeypotLabel}</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {submitError && (
                  <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    {submitError}
                  </p>
                )}

                <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
                  {submitting ? f.submitting : f.submit}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            <a
              href={`https://wa.me/${company.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface p-6 flex items-center gap-4 hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center flex-shrink-0">
                <WhatsAppIcon size={26} />
              </div>
              <div>
                <h4 className="font-semibold text-dark">{t.contact.info.whatsappTitle}</h4>
                <p className="text-sm text-dark/60">{t.contact.info.whatsappDesc}</p>
              </div>
            </a>

            <a href={`mailto:${company.email}`} className="card-surface p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <MailIcon size={26} strokeWidth={1.8} />
              </div>
              <div>
                <h4 className="font-semibold text-dark">{t.contact.info.emailTitle}</h4>
                <p className="text-sm text-dark/60">{company.email}</p>
              </div>
            </a>

            <div className="card-surface p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center flex-shrink-0">
                <MapPinIcon size={26} strokeWidth={1.8} />
              </div>
              <div>
                <h4 className="font-semibold text-dark">{t.contact.info.addressTitle}</h4>
                <p className="text-sm text-dark/60">{company.address}</p>
              </div>
            </div>

            <div className="card-surface overflow-hidden">
              <iframe
                title={t.contact.info.mapTitle}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(company.mapsQuery)}&t=&z=11&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-48 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
