import React from 'react';
import { useContextMenu } from 'react-contexify';
import { useOEmbed } from '@/hooks/youtube';
import Icon from '../common/Icon';
import { TbDots, TbMenu } from 'react-icons/tb';
import Spacer from '../common/Spacer';

const VideoRow = React.memo(
  ({
    id,
    videoId,
    menuId,
    onTitleClick,
    onDrag,
  }: {
    id: string;
    videoId: string;
    menuId: string;
    onTitleClick: (queue: Queue) => void;
    onDrag?: (e: React.PointerEvent<HTMLDivElement>) => void;
  }) => {
    const { show } = useContextMenu({
      props: {
        id,
        videoId,
      },
    });
    const { data } = useOEmbed(videoId);

    return (
      <div
        className="group flex select-none items-center gap-4 p-2 transition-colors hover:bg-white/10"
        onContextMenu={(event) => show({ id: menuId, event })}
      >
        {onDrag && (
          <div
            className="h-full w-5 shrink-0 cursor-move touch-none"
            onPointerDown={onDrag}
          >
            <Icon className='text-slate-300' icon={TbMenu} />
          </div>
        )}
        <div className="relative -z-10 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg">
          <div className="flex aspect-video h-full items-center justify-center">
            <img
              width={data?.thumbnail_width}
              height={data?.thumbnail_height}
              src={data?.thumbnail_url ?? ''}
              alt="Thumbnail"
              style={{ width: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className="flex-col justify-between">
          <p
            className="cursor-pointer text-lg font-bold line-clamp-1"
            onClick={() => onTitleClick({ id, videoId })}
          >
            {data?.title}
          </p>
          <a
            className="text-sm text-slate-300 line-clamp-1"
            target="_blank"
            href={data?.author_url ?? ''}
          >
            {data?.author_name}
          </a>
        </div>
        <Spacer />
        <button
          className="rounded-full p-2 transition-all hover:bg-white/20"
          aria-label='Open menu'
          name='Open menu'
          onClick={(event) => show({ id: menuId, event })}
        >
          <Icon className="h-4 w-4" icon={TbDots} />
        </button>
      </div>
    );
  }
);

export default VideoRow;
