import { queueAtom } from '@/atoms/player';
import { useOEmbed } from '@/hooks/youtube';
import { useAtomValue } from 'jotai';

export default function PlayingInfo() {
  const currentVideo = useAtomValue(queueAtom)[0];

  const { data } = useOEmbed(currentVideo?.videoId);

  return (
    <div className="flex space-x-4">
      {currentVideo ? (
        <div className="flex-col space-y-1">
          <a
            target="_blank"
            href={`https://youtu.be/${currentVideo?.videoId}`}
            className="block font-bold text-xl"
          >
            {data?.title}
          </a>
          <a
            target="_blank"
            href={data?.author_url ?? ''}
            className="block text-lg text-slate-300"
          >
            {data?.author_name}
          </a>
        </div>
      ) : (
        <div className='flex-col'>
          <p className='font-bold text-xl text-slate-300'>再生停止中</p>
        </div>
      )}
    </div>
  );
}
