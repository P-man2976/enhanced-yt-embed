import { queueAtom } from '@/atoms/player';
import { useToast } from '@/hooks/toast';
import { generateQueueID } from '@/modules/player';
import { getYouTubeID } from '@/modules/youtube';
import { useSetAtom } from 'jotai';
import { useRef, useState } from 'react';
import { TbClipboardText, TbPlaylistAdd } from 'react-icons/tb';
import { Icon } from '../common';

export default function AddToQueue() {
  const setQueue = useSetAtom(queueAtom);
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const [isInvalid, setIsInvalid] = useState(false);

  return (
    <div className="flex items-center space-x-4 p-2">
      <Icon className="h-8 w-8 text-slate-300" icon={TbPlaylistAdd} />
      <input
        aria-label="YouTube URL input field"
        className={`w-full rounded-none border-b border-slate-500 bg-transparent p-2 transition-all focus:border-slate-300 invalid:border-red-500 ${
          isInvalid && 'border-red-500'
        }`}
        type="url"
        placeholder="動画のURLを入力"
        ref={inputRef}
        onChange={(e) => {
          const videoId = getYouTubeID(e.target.value);
          if (videoId?.length === 11) {
            setQueue((oldQueue) => [
              ...oldQueue,
              { id: generateQueueID(), videoId },
            ]);
            toast({ text: '追加しました' });
            e.target.value = '';
          } else {
            setIsInvalid(!!e.target.value);
          }
        }}
      />
      <button
        aria-label="Paste link"
        name="Paste link"
        className="rounded-lg p-2  hover:bg-white/20 transition-all"
        onClick={async () => {
          const videoId = getYouTubeID(await navigator?.clipboard.readText());
          if (videoId?.length === 11) {
            setQueue((oldQueue) => [
              ...oldQueue,
              { id: generateQueueID(), videoId },
            ]);
            toast({ text: '追加しました' });
          }
        }}
      >
        <Icon className="h-6 w-6 text-slate-300" icon={TbClipboardText} />
      </button>
    </div>
  );
}
