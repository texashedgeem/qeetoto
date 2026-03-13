interface YouTubeEmbedProps {
  id: string;
  title: string;
}

export default function YouTubeEmbed({ id, title }: YouTubeEmbedProps) {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
      <iframe
        src={`https://www.youtube.com/embed/${id}?rel=0`}
        title={title}
        className="absolute top-0 left-0 w-full h-full"
        allowFullScreen
      />
    </div>
  );
}
