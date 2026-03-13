import HeroBanner from '@/components/HeroBanner';
import VideoGrid from '@/components/VideoGrid';
import { getVideos } from '@/lib/getVideos';

export const metadata = {
  title: 'Learn — Qeetoto',
  description: 'Open Banking video library — educational resources for developers, TPPs and banks.',
};

export default function LearnPage() {
  const videos = getVideos();
  return (
    <>
      <HeroBanner
        title="Open Banking Video Library"
        subtitle="Educational resources for developers, TPPs and banks."
      />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <VideoGrid videos={videos} />
      </div>
    </>
  );
}
