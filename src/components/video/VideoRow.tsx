import React from 'react';
import { useContextMenu } from 'react-contexify';
import { useOEmbed } from '@/hooks/youtube';
import { Icon, Spacer } from '../common';
import {
  TbAlertCircle,
  TbDots,
  TbMenu,
} from 'react-icons/tb';

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
    const { data, isLoading, isError } = useOEmbed(videoId);

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
            <Icon className="text-slate-300" icon={TbMenu} />
          </div>
        )}
        <div className="relative -z-10 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg">
          <div className="flex aspect-video h-full items-center justify-center">
            {isLoading ? (
              <div className="w-full h-full bg-slate-700 animate-pulse" />
            ) : isError ? (
              <Icon className="w-8 h-8 text-yellow-500" icon={TbAlertCircle} />
            ) : (
              <img
                width={data?.thumbnail_width}
                height={data?.thumbnail_height}
                src={data?.thumbnail_url ?? ''}
                alt="Thumbnail"
                style={{ width: '100%', objectFit: 'cover' }}
              />
            )}
          </div>
        </div>
        <div className="flex-col w-full justify-between">
          {isLoading ? (
            <div className="h-4 w-4/5 rounded-md bg-slate-700 animate-pulse" />
          ) : isError ? (
            <p className="text-lg font-bold line-clamp-1 text-slate-300">
              動画情報を取得できませんでした
            </p>
          ) : (
            <p
              className="cursor-pointer text-lg font-bold line-clamp-1"
              onClick={() => onTitleClick({ id, videoId })}
            >
              {data?.title}
            </p>
          )}
          {isLoading ? (
            <div className="h-3 w-2/5 mt-2 rounded-md bg-slate-700  animate-pulse" />
          ) : (
            <a
              className="text-sm text-slate-300 line-clamp-1"
              target="_blank"
              href={data?.author_url ?? ''}
            >
              {data?.author_name}
            </a>
          )}
        </div>
        <Spacer />
        <button
          className="rounded-full p-2 transition-all hover:bg-white/20"
          aria-label="Open menu"
          name="Open menu"
          onClick={(event) => show({ id: menuId, event })}
        >
          <Icon className="h-4 w-4" icon={TbDots} />
        </button>
      </div>
    );
  }
);

export default VideoRow;
