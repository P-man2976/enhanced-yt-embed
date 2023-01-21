import { intervalToDuration } from 'date-fns';

export const generateQueueID = () => Math.random().toString(32).substring(2);

export function formatSeconds(secs: number) {
  const { hours, minutes, seconds } = intervalToDuration({
    start: 0,
    end: secs * 1000,
  });
  return `${hours ? hours + ':' : ''}${
    String(minutes).padStart(!hours ? 1 : 2, '0') || (hours ? '00' : '0')
  }:${String(seconds).padStart(2, '0') || '00'}`;
}

export function shuffle<T>([...array]: T[]) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
