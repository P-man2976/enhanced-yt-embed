import {
  historyAtom,
  internalHistoryAtom,
  playerAtom,
  queueAtom,
  repeatModeAtom,
  repeatQueueAtom,
  shuffleModeAtom,
} from '@/atoms/player';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useState, useEffect } from 'react';
import { generateQueueID, shuffle as shuffleVideos } from '@/modules/player';
import { useHistory } from './history';

export const usePlayer = () => {
  const player = useAtomValue(playerAtom);
  const { add: addHistory } = useHistory();
  const [queue, setQueue] = useAtom(queueAtom);
  const setHistory = useSetAtom(historyAtom);
  const setInternalHistory = useSetAtom(internalHistoryAtom);
  const [shuffleMode, setShuffleMode] = useAtom(shuffleModeAtom);
  const [repeatMode, setRepeatMode] = useAtom(repeatModeAtom);
  const [repeatQueue, setRepeatQueue] = useAtom(repeatQueueAtom);

  // Play specified video immediately
  const play = useCallback(
    (videoId: string) => {
      setQueue(([currentVideo, ...queue]) => {
        addHistory([currentVideo], true);
        return [{ id: generateQueueID(), videoId }, ...queue];
      });
    },
    [setQueue, addHistory]
  );

  // Skip one video
  const skip = useCallback(() => {
    setQueue(([currentVideo, ...newQueue]) => {
      addHistory([currentVideo], true);
      if (newQueue.length) player?.playVideo();
      else if (repeatMode === 'all') {
        return repeatQueue;
      } else {
        player?.stopVideo();
      }
      return newQueue;
    });
  }, [player, setQueue, addHistory, repeatMode, repeatQueue]);

  // Skip to specified video
  const skipTo = useCallback(
    (queueId: string) => {
      setQueue(([currentVideo, ...oldQueue]) => {
        const queueIndex = oldQueue.findIndex((queue) => queue.id === queueId);
        const skipedVideos = oldQueue.slice(0, queueIndex);
        addHistory([currentVideo], false);
        setInternalHistory((oldHistory) => [
          ...oldHistory,
          currentVideo,
          ...skipedVideos,
        ]);

        return oldQueue.slice(queueIndex, oldQueue.length);
      });
    },
    [setQueue, addHistory, setInternalHistory]
  );

  // Play previous video
  const previous = useCallback(() => {
    setInternalHistory((oldHistory) => {
      const lastVideo = oldHistory.at(-1);
      if (lastVideo) {
        setQueue((oldQueue) => [lastVideo, ...oldQueue]);
        // setHistory((oldHistory) => [...oldHistory, lastVideo]);
      }
      return oldHistory.filter((video) => video.id !== lastVideo?.id);
    });
  }, [setInternalHistory, setHistory, setQueue]);

  // Play / Pause
  const togglePlay = useCallback(() => {
    (async () => {
      const playerState = await player?.getPlayerState();
      if (playerState === 1) await player?.pauseVideo();
      else await player?.playVideo();
    })();
  }, [player]);

  const toggleShuffle = useCallback(() => {
    setShuffleMode((current) => {
      if (!current)
        setQueue(([current, ...queue]) => [current, ...shuffleVideos(queue)]);
      return !current;
    });
  }, [setShuffleMode, setQueue]);

  // Repeat
  const toggleRepeat = useCallback(() => {
    setRepeatMode((current) => {
      const nextRepeatMode =
        current === 'off' ? 'all' : current === 'all' ? 'one' : 'off';

      if (nextRepeatMode === 'all') setRepeatQueue(queue);

      return nextRepeatMode;
    });
  }, [setRepeatMode, queue, setRepeatQueue]);

  return {
    play,
    skip,
    skipTo,
    previous,
    togglePlay,
    shuffleMode,
    toggleShuffle,
    repeatMode,
    toggleRepeat,
  };
};

export const usePlayerStats = () => {
  const player = useAtomValue(playerAtom);
  const [isMuted, setMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [rate, setRate] = useState(1);
  const [loaded, setLoaded] = useState(0);
  const [playerState, setPlayerState] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentVideo, setCurrentVideo] = useState('');

  useEffect(() => {
    const timer = player
      ? setInterval(async () => {
          setMuted(await player.isMuted());
          setVolume(await player.getVolume());
          setRate(await player.getPlaybackRate());
          setLoaded(await player.getVideoLoadedFraction());
          setPlayerState(await player.getPlayerState());
          setCurrentTime((await player.getCurrentTime()) ?? 0);
          setDuration((await player.getDuration()) ?? 0);
          setCurrentVideo(await player.getVideoUrl());
        }, 200)
      : undefined;

    return () => clearInterval(timer);
  }, [player]);

  return {
    isMuted,
    volume,
    rate,
    loaded,
    playerState,
    currentTime,
    duration,
    currentVideo,
  };
};
