import {
  IoPause,
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward
} from 'react-icons/io5';
import { usePlayer, usePlayerStats } from '@/hooks/player';
import ControlButton from './ControlButton';
import { TbArrowsShuffle, TbRepeat, TbRepeatOnce } from 'react-icons/tb';
import { useKbdCtrls } from '@/hooks/hotkeys';

export default function PlaybackControls() {
  const {
    togglePlay,
    skip,
    previous,
    shuffleMode,
    toggleShuffle,
    repeatMode,
    toggleRepeat,
  } = usePlayer();
  const { playerState } = usePlayerStats();
  useKbdCtrls();

  return (
    <div className="flex w-full items-center justify-between">
      <ControlButton
        className="h-6 w-6 md:h-8 md:w-8"
        aria-label='Shuffle'
        name='Shuffle'
        icon={TbArrowsShuffle}
        onClick={toggleShuffle}
        style={{ opacity: shuffleMode ? 1 : 0.5 }}
      />
      <ControlButton
        className="h-10 w-10 md:h-12 md:w-12"
        aria-label='Previous track'
        name='Previous track'
        icon={IoPlaySkipBack}
        onClick={previous}
      />
      <ControlButton
        className="h-16 w-16 md:h-20 md:w-20"
        aria-label='Play / Pause'
        name='Play / Pause'
        icon={playerState === 1 ? IoPause : IoPlay}
        onClick={togglePlay}
      />
      <ControlButton
        className="h-10 w-10 md:h-12 md:w-12"
        aria-label='Skip track'
        name='Skip track'
        icon={IoPlaySkipForward}
        onClick={skip}
      />
      <ControlButton
        className="h-6 w-6 md:h-8 md:w-8"
        aria-label='Repeat'
        name='Repeat'
        icon={repeatMode === 'one' ? TbRepeatOnce : TbRepeat}
        onClick={toggleRepeat}
        style={{ opacity: repeatMode !== 'off' ? 1 : 0.5 }}
      />
    </div>
  );
}
