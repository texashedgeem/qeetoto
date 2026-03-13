import { Video } from '@/lib/getVideos';
import VideoCard from './VideoCard';

export default function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.slug} video={video} />
      ))}
    </div>
  );
}
