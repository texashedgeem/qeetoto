import HeroBanner from '@/components/HeroBanner';
import ServiceCard from '@/components/ServiceCard';
import { getServices } from '@/lib/getServices';

export const metadata = {
  title: 'Services — Qeetoto',
  description: 'Open Banking testing, consulting and production services from Qeetoto.',
};

export default function ServicesPage() {
  const services = getServices();
  return (
    <>
      <HeroBanner
        title="Our Services"
        subtitle="Open Banking testing, consulting and production services."
      />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </>
  );
}
