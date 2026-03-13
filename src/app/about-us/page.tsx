import HeroBanner from '@/components/HeroBanner';

export const metadata = {
  title: 'About Us — Qeetoto',
  description: 'About Qeetoto — Open Banking testing and consulting specialists.',
};

export default function AboutUsPage() {
  return (
    <>
      <HeroBanner title="About Us" />
      <div className="max-w-4xl mx-auto px-6 py-12 prose prose-indigo">
        <p className="text-lg text-gray-700">
          Qeetoto is a specialist Open Banking testing and consulting company registered in England and Wales.
          We help TPPs, banks, and API aggregators test, validate and improve their Open Banking implementations
          using real bank accounts in live environments.
        </p>
        <p className="text-gray-700 mt-4">
          Our team of Open Banking experts has hands-on experience with the UK Open Banking Standards, PSD2,
          AIS, PIS and VRP. We offer a range of services from consent testing to bespoke consulting engagements.
        </p>
      </div>
    </>
  );
}
