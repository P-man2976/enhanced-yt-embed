import { useOEmbed } from '@/hooks/youtube';

export default function VideoInfo({ id }: { id: string }) {
  const { data } = useOEmbed(id);

  return (
    <div className="flex-col space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        {data ? (
          <img
            src={data?.thumbnail_url}
            alt="Thumbnail"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="animate-pulse h-full w-full bg-black/20" />
        )}
      </div>
      {data ? (
        <div className="flex-col">
          <p className="font-bold text-xl line-clamp-1">{data?.title}</p>
          <p className="">{data?.author_name}</p>
        </div>
      ) : (
        <div className='space-y-4 animate-pulse'>
          <div className="h-4 w-4/5 bg-black/20 rounded-lg" />
          <div className="h-4 w-1/2 bg-black/20 rounded-lg" />
        </div>
      )}
    </div>
  );
}
