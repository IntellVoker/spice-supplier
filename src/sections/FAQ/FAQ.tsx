import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle';
import { PlusIcon } from '../../components/ui/Icons';
import { fadeInUp, viewportOnce, staggeredTransition } from '../../lib/motion';
import { useI18n } from '../../hooks/useI18n';

export default function FAQ() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32" aria-label={t.faq.title}>
      <div className="container-page">
        <SectionTitle
          eyebrow={t.faq.eyebrow}
          title={t.faq.title}
          subtitle={t.faq.subtitle}
        />

        <div className="mt-14 max-w-3xl mx-auto space-y-3">
          {t.faq.items.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={staggeredTransition(i)}
                className="card-surface overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-2xl"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="font-display text-base sm:text-lg font-semibold text-dark">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    aria-hidden="true"
                  >
                    <PlusIcon size={16} />
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                  role="region"
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-dark/60 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
