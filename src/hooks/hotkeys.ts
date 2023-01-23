import { playerAtom } from "@/atoms/player";
import { useAtomValue } from "jotai";
import { useHotkeys } from "react-hotkeys-hook"
import { usePlayer } from "./player"


export const useKbdCtrls = () => {
	const player = useAtomValue(playerAtom);
	const { togglePlay, previous, skip, toggleShuffle, toggleRepeat } = usePlayer();

	// Play / Pause
	useHotkeys('space', togglePlay, { preventDefault: true }, [togglePlay]);

	// Skip / Previous track
	useHotkeys('ctrl+left, cmd+left', previous, [previous]);
	useHotkeys('ctrl+right, cmd+right', skip, [skip]);

	// Shuffle
	useHotkeys('s', toggleShuffle, [toggleShuffle]);

	// Repeat
	useHotkeys('r', toggleRepeat, [toggleRepeat]);

	// Volume
	useHotkeys('ctrl+down, cmd+down', async () => {
		const currentVolume = await player?.getVolume() ?? 0;
		player?.setVolume(Math.max(currentVolume - 5, 0))
	}, [player]);
	useHotkeys('ctrl+up, cmd+up', async () => {
			const currentVolume = (await player?.getVolume()) ?? 0;
      player?.setVolume(Math.min(currentVolume + 5, 100));
	}, [player])
}