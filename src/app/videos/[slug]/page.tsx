import { notFound } from 'next/navigation';
import HeroBanner from '@/components/HeroBanner';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { getVideos, getVideo } from '@/lib/getVideos';

export async function generateStaticParams() {
  return getVideos().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const video = getVideo(params.slug);
  if (!video) return {};
  return { title: `${video.title} — Qeetoto`, description: video.summary };
}

export default function VideoPage({ params }: { params: { slug: string } }) {
  const video = getVideo(params.slug);
  if (!video) notFound();

  return (
    <>
      <HeroBanner title={video.title} />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <YouTubeEmbed id={video.youtube_id} title={video.title} />
        <p className="mt-6 text-gray-700 text-lg">{video.summary}</p>
      </div>
    </>
  );
}
