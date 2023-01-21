import { YouTubeEvent, YouTubeProps } from 'react-youtube';
import { useAtom, useAtomValue } from 'jotai';
import { playerAtom, queueAtom, repeatModeAtom } from '@/atoms/player';
import React, { useCallback, useEffect, useMemo } from 'react';
import { getYouTubeID } from '@/modules/youtube';
import { usePlayer } from '@/hooks/player';

const YouTube = React.lazy(() => import('react-youtube'));

export default function YouTubePlayer() {
  const queue = useAtomValue(queueAtom);
  const [player, setPlayer] = useAtom(playerAtom);
  const repeatMode = useAtomValue(repeatModeAtom);
  const { skip } = usePlayer();

  useEffect(() => {
    (async () => {
      if (
        queue[0] &&
        getYouTubeID(await player?.getVideoUrl()) !== queue[0]?.videoId
      )
        await player?.loadVideoById(queue[0]);
    })();
  }, [player, queue]);

  const onReady = useCallback((e: YouTubeEvent<any>) => {
    setPlayer(e.target);
  }, []);

  const onStateChange = useCallback(
    (e: YouTubeEvent<number>) => {
      if (e.data === 0) repeatMode === 'one' ? player?.playVideo() : skip();
    },
    [repeatMode, player, skip]
  );

  const onError = useCallback(() => skip(), [skip]);

  const playerOpts = useMemo<YouTubeProps['opts']>(
    () => ({
      playerVars: {
        autoplay: 1,
        controls: 1,
        modestbranding: 1,
        origin: window.origin
      },
    }),
    []
  );

  return (
    <YouTube
      className="w-full aspect-video"
      iframeClassName="w-full h-full shadow-md rounded-xl"
      onReady={onReady}
      onStateChange={onStateChange}
      onError={onError}
      opts={playerOpts}
    />
  );
}
