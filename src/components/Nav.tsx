import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="bg-indigo-700 text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Qeetoto
        </Link>
        <ul className="flex gap-6 text-sm font-medium">
          <li><Link href="/about-us" className="hover:text-indigo-200 transition-colors">About Us</Link></li>
          <li><Link href="/learn" className="hover:text-indigo-200 transition-colors">Learn</Link></li>
          <li><Link href="/services" className="hover:text-indigo-200 transition-colors">Services</Link></li>
          <li>
            <Link
              href="/services/consent-for-rent"
              className="bg-white text-indigo-700 px-4 py-1.5 rounded font-semibold hover:bg-indigo-50 transition-colors"
            >
              Request Test
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
