import { useEffect, useState } from 'react';
import { playerAtom } from '@/atoms/player';
import { usePlayerStats } from '@/hooks/player';
import { useAtomValue } from 'jotai';
import { IoVolumeHigh, IoVolumeLow } from 'react-icons/io5';
import Icon from '../common/Icon';
import Slider from '../common/Slider';

export default function Volume() {
  const player = useAtomValue(playerAtom);
  const { volume } = usePlayerStats();
	// Client volume state for smooth volume adjust
	const [sliderVolume, setSliderVolume] = useState(volume);

  useEffect(() => {
    setSliderVolume(volume);
  }, [volume])

  return (
    <div className="flex items-center space-x-8">
      <Icon className="w-12 h-12 text-slate-300" icon={IoVolumeLow} />
      {/* <input
        type="range"
        className="w-full"
        value={isMuted ? 0 : sliderVolume}
        onChange={(e) => {
          setSliderVolume(e.target.valueAsNumber);
          player?.unMute();
          player?.setVolume(e.target.valueAsNumber);
        }}
      /> */}
      <Slider
        min={0}
        max={100}
        step={1}
        values={[sliderVolume || 0]}
        onChange={(values) => {
          setSliderVolume(values[0]);
          player?.unMute();
          player?.setVolume(values[0]);
        }}
      />
      <Icon className="w-12 h-12 text-slate-300" icon={IoVolumeHigh} />
    </div>
  );
}
