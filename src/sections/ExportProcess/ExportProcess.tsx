import { motion } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle';
import { useI18n } from '../../hooks/useI18n';
import { fadeInUp, viewportOnce, staggeredTransition } from '../../lib/motion';

export default function ExportProcess() {
  const { t } = useI18n();

  return (
    <section id="process" className="py-24 lg:py-32" aria-label={t.process.title}>
      <div className="container-page">
        <SectionTitle
          eyebrow={t.process.eyebrow}
          title={t.process.title}
          subtitle={t.process.subtitle}
        />

        <div className="mt-16 relative">
          <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/30 via-primary/15 to-transparent" />

          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12">
            {t.process.steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={staggeredTransition(i)}
                className={`relative flex gap-5 ${i % 2 === 1 ? 'lg:flex-row-reverse lg:text-right' : ''}`}
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-display text-lg font-semibold shadow-lg shadow-primary/30">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="font-display text-xl font-semibold text-dark mb-2">{step.title}</h3>
                  <p className="text-sm text-dark/60 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
