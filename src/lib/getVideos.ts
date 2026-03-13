import fs from 'fs';
import path from 'path';

export interface Video {
  title: string;
  slug: string;
  order: number;
  youtube_id: string;
  summary: string;
}

export function getVideos(): Video[] {
  const dir = path.join(process.cwd(), 'content/videos');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  const videos = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    return JSON.parse(raw) as Video;
  });
  return videos.sort((a, b) => a.order - b.order);
}

export function getVideo(slug: string): Video | undefined {
  return getVideos().find((v) => v.slug === slug);
}
