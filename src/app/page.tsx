import Link from 'next/link';
import HeroBanner from '@/components/HeroBanner';
import ServiceCard from '@/components/ServiceCard';
import VideoGrid from '@/components/VideoGrid';
import { getServices } from '@/lib/getServices';
import { getVideos } from '@/lib/getVideos';

export default function HomePage() {
  const services = getServices();
  const featuredVideos = getVideos().slice(0, 3);

  return (
    <>
      <HeroBanner
        title="Open Banking Testing & Consulting"
        subtitle="Real bank accounts. Live environments. Expert guidance."
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>

      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Learn Open Banking</h2>
            <Link href="/learn" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View all videos →
            </Link>
          </div>
          <VideoGrid videos={featuredVideos} />
        </div>
      </div>
    </>
  );
}
