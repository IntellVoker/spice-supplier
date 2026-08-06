import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';
import { CheckIcon } from '../../components/ui/Icons';
import { fadeInUp } from '../../lib/motion';

export default function Hero() {
  const { t } = useI18n();
  const s = t.hero.strengths;

  const strengths = [
    { value: s.professionalCommunication, label: s.professionalCommunicationDesc },
    { value: s.exportProcess, label: s.exportProcessDesc },
    { value: s.supplierPartnership, label: s.supplierPartnershipDesc },
    { value: s.responsiveService, label: s.responsiveServiceDesc },
    { value: s.documentationSupport, label: s.documentationSupportDesc },
    { value: s.longTermCommitment, label: s.longTermCommitmentDesc },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20" aria-label={t.hero.eyebrow}>
      <div className="absolute inset-0 z-0">
        <img
          src="/images/products/Background_(1).png"
          alt={t.hero.eyebrow}
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/80 to-primary/50" />
      </div>

      <div className="container-page relative z-10 py-20">
        <div className="max-w-2xl">
          <motion.span
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-5"
          >
            {t.hero.eyebrow}
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.1]"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-white/80 leading-relaxed max-w-xl"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <a href="#contact" className="btn-gold">
              {t.hero.primaryCta}
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/50 active:scale-95"
            >
              {t.hero.secondaryCta}
            </a>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-xl"
          >
            {strengths.map((strength) => (
              <div key={strength.value} className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
                  <CheckIcon size={12} stroke="#D4A017" strokeWidth={3} />
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">{strength.value}</div>
                  <div className="text-xs text-white/60 leading-tight">{strength.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
