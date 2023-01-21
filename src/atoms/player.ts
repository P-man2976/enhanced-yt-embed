import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { YouTubePlayer } from 'react-youtube';

export const playerAtom = atom<YouTubePlayer | null>(null);
export const queueAtom = atomWithStorage<Queue[]>('queue', []);
export const historyAtom = atomWithStorage<Queue[]>('history', []);
export const internalHistoryAtom = atom<Queue[]>([]);
export const shuffleModeAtom = atomWithStorage<boolean>('shuffle', false);
export const repeatModeAtom = atomWithStorage<RepeatMode>('repeat', 'off');
export const repeatQueueAtom = atom<Queue[]>([]);