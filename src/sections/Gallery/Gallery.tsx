import { motion } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle';
import { useI18n } from '../../hooks/useI18n';
import { scaleIn, viewportOnce, staggeredTransition } from '../../lib/motion';

const galleryItems = [
  {
    src: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=800',
    width: 800,
    height: 600,
    labelKey: 'farms' as const,
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/4198023/pexels-photo-4198023.jpeg?auto=compress&cs=tinysrgb&w=800',
    width: 400,
    height: 300,
    labelKey: 'warehouses' as const,
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=800',
    width: 400,
    height: 300,
    labelKey: 'packaging' as const,
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=800',
    width: 400,
    height: 300,
    labelKey: 'containers' as const,
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/906831/pexels-photo-906831.jpeg?auto=compress&cs=tinysrgb&w=800',
    width: 800,
    height: 300,
    labelKey: 'loading' as const,
    span: 'lg:col-span-2',
  },
];

export default function Gallery() {
  const { t } = useI18n();

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-cream" aria-label={t.gallery.title}>
      <div className="container-page">
        <SectionTitle
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
        />

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] lg:auto-rows-[250px]">
          {galleryItems.map((item, i) => (
            <motion.figure
              key={i}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={staggeredTransition(i)}
              className={`relative overflow-hidden rounded-xl group ${item.span}`}
            >
              <img
                src={item.src}
                alt={t.gallery.labels[item.labelKey]}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
              <figcaption className="absolute bottom-4 left-4">
                <span className="text-white font-display text-lg font-semibold drop-shadow">
                  {t.gallery.labels[item.labelKey]}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
