import { useState, useEffect } from 'react';
import { playerAtom } from '@/atoms/player';
import { usePlayerStats } from '@/hooks/player';
import { useAtomValue } from 'jotai';
import { formatSeconds } from '@/modules/player';
import { Slider } from '../common/';

export default function Progress() {
  const { currentTime, duration } = usePlayerStats();
  const [isDuration, setIsDuration] = useState(true);

  // Client progress state for smooth seeking
  const [sliderProgress, setSliderProgress] = useState(
    (currentTime / duration) * 100
  );
  const player = useAtomValue(playerAtom);

  useEffect(() => {
    setSliderProgress((currentTime / duration) * 100);
  }, [currentTime, duration]);

  return (
    <div className="w-full flex-col space-y-2">
      <Slider
        min={0}
        max={100}
        step={0.01}
        values={[sliderProgress || 0]}
        onChange={async (values) => {
          const progress = duration * (values[0] / 100);
          setSliderProgress((progress / duration) * 100);
          await player?.seekTo(progress, true);
        }}
      />
      <div className="flex justify-between w-full">
        <p className="text-slate-300">{formatSeconds(currentTime)}</p>
        <p
          className="text-slate-300 cursor-pointer"
          onClick={() => setIsDuration(!isDuration)}
        >
          {isDuration
            ? formatSeconds(duration)
            : `-${formatSeconds(duration - currentTime)}`}
        </p>
      </div>
    </div>
  );
}
