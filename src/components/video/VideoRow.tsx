import React from 'react';
import { useContextMenu } from 'react-contexify';
import { useOEmbed } from '@/hooks/youtube';
import { Icon, Spacer } from '../common';
import { TbAlertCircle, TbDots, TbMenu } from 'react-icons/tb';
import { Box, Flex, HStack, css } from '@kuma-ui/core';

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
      <HStack
        role="group"
        alignItems="center"
        gap="1rem"
        p="0.5rem"
        transition="all .2s ease"
        _hover={{
          bg: 'rgba(255, 255, 255, 0.1)',
        }}
        onContextMenu={(event) => show({ id: menuId, event })}
      >
        {onDrag && (
          <Box
            height="100%"
            width="1.25rem"
            flexShrink="0"
            cursor="grab"
            className={css`
              touch-action: none;
            `}
            onPointerDown={onDrag}
          >
            <Icon color="colors.slate.300" icon={TbMenu} />
          </Box>
        )}
        <Flex
          position="relative"
          width="3rem"
          height="3rem"
          flexShrink="0"
          alignItems="center"
          justify="center"
          overflow="hidden"
          borderRadius="0.5rem"
          zIndex={-10}
        >
          <Flex
            height="100%"
            alignItems="center"
            justify="center"
            className={css`
              aspect-ratio: 16 / 9;
            `}
          >
            {isLoading ? (
              <div className="h-full w-full animate-pulse bg-slate-700" />
            ) : isError ? (
              <Icon
                height="2rem"
                width="2rem"
                color="rgb(234 179 8)"
                icon={TbAlertCircle}
              />
            ) : (
              <img
                loading="lazy"
                width={data?.thumbnail_width}
                height={data?.thumbnail_height}
                src={data?.thumbnail_url ?? ''}
                alt="Thumbnail"
                style={{ width: '100%', objectFit: 'cover' }}
              />
            )}
          </Flex>
        </Flex>
        <div className="w-full flex-col justify-between">
          {isLoading ? (
            <div className="h-4 w-4/5 animate-pulse rounded-md bg-slate-700" />
          ) : isError ? (
            <p className="text-lg font-bold text-slate-300 line-clamp-1">
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
            <div className="mt-2 h-3 w-2/5 animate-pulse rounded-md  bg-slate-700" />
          ) : (
            <a
              className="text-sm text-slate-300 line-clamp-1"
              target="_blank"
              href={data?.author_url ?? ''}
              rel="noreferrer"
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
          <Icon width="1rem" height="1rem" icon={TbDots} />
        </button>
      </HStack>
    );
  }
);

export default VideoRow;
