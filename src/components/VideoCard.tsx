import Link from 'next/link';
import { Video } from '@/lib/getVideos';

export default function VideoCard({ video }: { video: Video }) {
  return (
    <Link
      href={`/videos/${video.slug}`}
      className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden"
    >
      <img
        src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
        alt={video.title}
        className="w-full aspect-video object-cover"
      />
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 leading-snug">{video.title}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{video.summary}</p>
      </div>
    </Link>
  );
}
