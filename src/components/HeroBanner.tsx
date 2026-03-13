interface HeroBannerProps {
  title: string;
  subtitle?: string;
}

export default function HeroBanner({ title, subtitle }: HeroBannerProps) {
  return (
    <div className="bg-indigo-700 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-4 text-lg text-indigo-200">{subtitle}</p>}
      </div>
    </div>
  );
}
