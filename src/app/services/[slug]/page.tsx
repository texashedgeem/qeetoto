import { notFound } from 'next/navigation';
import HeroBanner from '@/components/HeroBanner';
import { getServices, getService } from '@/lib/getServices';

export async function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) return {};
  return { title: `${service.title} — Qeetoto`, description: service.summary };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  return (
    <>
      <HeroBanner title={service.title} subtitle={service.summary} />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-gray-700 text-lg">{service.summary}</p>
      </div>
    </>
  );
}
