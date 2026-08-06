import { motion } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle';
import { company } from '../../data/company';
import { useI18n } from '../../hooks/useI18n';
import { fadeInUp, slideInLeft, viewportOnce, staggeredTransition } from '../../lib/motion';

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="py-24 lg:py-32 bg-cream" aria-label={t.about.title}>
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={company.aboutImage}
                alt={t.about.title}
                width={900}
                height={600}
                loading="lazy"
                decoding="async"
                className="w-full h-[480px] object-cover object-top"
              />
            </div>
          </motion.div>

          <div>
            <SectionTitle
              eyebrow={t.about.eyebrow}
              title={t.about.title}
              center={false}
            />

            <div className="mt-6 space-y-4">
              {t.about.paragraphs.map((paragraph, i) => (
                <motion.p
                  key={i}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-dark/60 leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <h4 className="font-display text-lg font-semibold text-primary mb-2">{t.about.visionTitle}</h4>
                <p className="text-sm text-dark/60 leading-relaxed">{t.about.vision}</p>
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <h4 className="font-display text-lg font-semibold text-primary mb-2">{t.about.missionTitle}</h4>
                <p className="text-sm text-dark/60 leading-relaxed">{t.about.mission}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <SectionTitle
            eyebrow={t.about.whyIndonesiaEyebrow}
            title={t.about.whyIndonesiaTitle}
          />
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {t.about.whyIndonesia.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={staggeredTransition(i)}
                className="card-surface p-7"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="font-display text-xl font-semibold text-primary">{i + 1}</span>
                </div>
                <p className="text-dark/70 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
