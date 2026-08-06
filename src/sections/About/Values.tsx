import SectionTitle from '../../components/SectionTitle';
import IconCard from '../../components/ui/IconCard';
import { StarIcon } from '../../components/ui/Icons';
import { useI18n } from '../../hooks/useI18n';

export default function Values() {
  const { t } = useI18n();

  return (
    <section id="values" className="py-24 lg:py-32" aria-label={t.values.title}>
      <div className="container-page">
        <SectionTitle
          eyebrow={t.values.eyebrow}
          title={t.values.title}
          subtitle={t.values.subtitle}
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.values.items.map((value, i) => (
            <IconCard
              key={value.title}
              icon={<StarIcon size={28} />}
              iconClassName="bg-gold/10 text-gold"
              title={value.title}
              description={value.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
