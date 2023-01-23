import { useEffect, useRef } from 'react';
import AddToQueue from './AddToQueue';
import Spacer from '../common/Spacer';
import { useHistory } from '@/hooks/history';
import QueueList from './QueueList';
import HistoryList from './HistoryList';

export default function VideoQueue() {
  const { removeAll } = useHistory();
  const queueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    queueRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="flex relative h-full w-full snap-y snap-proximity flex-col gap-4 overflow-y-auto rounded-xl">
      <div className="snap-start">
        <div className="sticky top-0 flex justify-between px-4 py-2 backdrop-blur">
          <p className="text-2xl font-bold">履歴</p>
          <button
            className="px-4 rounded-lg transition-all"
            aria-label='Remove history'
            name='Remove history'
            onClick={removeAll}
          >
            消去
          </button>
        </div>
        <div className="w-full rounded-xl px-2">
          <HistoryList />
        </div>
      </div>
      <div className="snap-start">
        <div
          className="sticky top-0 flex justify-between px-4 py-2 backdrop-blur"
          ref={queueRef}
        >
          <p className="text-2xl font-bold">次に再生</p>
        </div>
        <div className="w-full px-2">
          <QueueList />
        </div>
      </div>
      <Spacer />
      <div className="sticky bottom-0 w-full backdrop-blur">
        <AddToQueue />
      </div>
    </div>
  );
}
