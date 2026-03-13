import Link from 'next/link';
import { Service } from '@/lib/getServices';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
    >
      <h3 className="text-lg font-semibold text-indigo-700">{service.title}</h3>
      <p className="mt-2 text-sm text-gray-600">{service.summary}</p>
    </Link>
  );
}
