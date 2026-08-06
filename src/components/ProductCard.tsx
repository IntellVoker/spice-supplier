import { motion } from 'framer-motion';
import type { Product } from '../data/products';
import { ArrowRightIcon } from './ui/Icons';
import { fadeInUp, viewportOnce } from '../lib/motion';

interface ProductCardProps {
  product: Product & { description: string; applications: string; forms: string };
  index?: number;
  labels: {
    origin: string;
    applications: string;
    forms: string;
    packaging: string;
    moq: string;
  };
  featuredLabel: string;
  requestDetailsLabel: string;
}

export default function ProductCard({
  product,
  index = 0,
  labels,
  featuredLabel,
  requestDetailsLabel,
}: ProductCardProps) {
  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-surface overflow-hidden group flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={`${product.name} — ${product.scientificName}`}
          width={400}
          height={300}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.featured && (
          <span className="absolute top-4 left-4 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold text-white uppercase tracking-wide">
            {featuredLabel}
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-xs italic text-dark/40 mb-1">{product.scientificName}</p>
        <h3 className="font-display text-xl font-semibold text-dark mb-2">{product.name}</h3>
        <p className="text-sm text-dark/60 leading-relaxed mb-5">{product.description}</p>

        <dl className="mt-auto space-y-2.5 border-t border-black/5 pt-4">
          <div className="flex justify-between gap-3 text-sm">
            <dt className="font-medium text-dark/50 flex-shrink-0">{labels.origin}</dt>
            <dd className="text-dark/80 text-right">{product.origin}</dd>
          </div>
          <div className="flex justify-between gap-3 text-sm">
            <dt className="font-medium text-dark/50 flex-shrink-0">{labels.applications}</dt>
            <dd className="text-dark/80 text-right">{product.applications}</dd>
          </div>
          <div className="flex justify-between gap-3 text-sm">
            <dt className="font-medium text-dark/50 flex-shrink-0">{labels.forms}</dt>
            <dd className="text-dark/80 text-right">{product.forms}</dd>
          </div>
          <div className="flex justify-between gap-3 text-sm">
            <dt className="font-medium text-dark/50 flex-shrink-0">{labels.packaging}</dt>
            <dd className="text-dark/80 text-right">{product.packaging}</dd>
          </div>
          <div className="flex justify-between gap-3 text-sm">
            <dt className="font-medium text-dark/50 flex-shrink-0">{labels.moq}</dt>
            <dd className="font-semibold text-primary">{product.moq}</dd>
          </div>
        </dl>

        <a
          href="#contact"
          className="mt-5 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          aria-label={`${requestDetailsLabel} for ${product.name}`}
        >
          {requestDetailsLabel}
          <ArrowRightIcon size={16} />
        </a>
      </div>
    </motion.article>
  );
}
