interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = true,
}: SectionTitleProps) {
  return (
    <div className={center ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}>
      {eyebrow && (
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-gold">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-dark">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base sm:text-lg leading-relaxed text-dark/60">
          {subtitle}
        </p>
      )}
    </div>
  );
}
