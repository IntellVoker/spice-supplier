import SectionTitle from '../../components/SectionTitle';
import ProductCard from '../../components/ProductCard';
import { products } from '../../data/products';
import { useI18n } from '../../hooks/useI18n';

export default function Products() {
  const { t } = useI18n();

  const localizedProducts = products.map((product) => {
    const translation = t.products.items.find((item) => item.id === product.id);
    return {
      ...product,
      description: translation?.description ?? product.name,
      applications: translation?.applications ?? '',
      forms: translation?.forms ?? '',
    };
  });

  return (
    <section id="products" className="py-24 lg:py-32" aria-label={t.products.title}>
      <div className="container-page">
        <SectionTitle
          eyebrow={t.products.eyebrow}
          title={t.products.title}
          subtitle={t.products.subtitle}
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {localizedProducts.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              labels={t.products.fields}
              featuredLabel={t.products.featured}
              requestDetailsLabel={t.products.requestDetails}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-dark/50 text-sm mb-4">{t.products.customSourcingPrompt}</p>
          <a href="#contact" className="btn-outline">
            {t.products.customSourcingCta}
          </a>
        </div>
      </div>
    </section>
  );
}
