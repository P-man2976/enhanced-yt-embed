import { useEffect, useRef } from 'react';
import AddToQueue from './AddToQueue';
import { Icon, Spacer, Collapse } from '../common/';
import { useHistory } from '@/hooks/history';
import QueueList from './QueueList';
import HistoryList from './HistoryList';
import { useBoolean } from '@/hooks/layout';
import { TbChevronRight } from 'react-icons/tb';

export default function VideoQueue() {
  const { removeAll } = useHistory();
  const { isOpen: isHistoryOpen, onToggle: onHistoryToggle } = useBoolean({
    initial: true,
  });
  const { isOpen: isQueueOpen, onToggle: onQueueToggle } = useBoolean({
    initial: true,
  });
  const queueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    queueRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="flex relative h-full w-full snap-y snap-proximity flex-col gap-4 overflow-y-auto rounded-xl">
      <div className="snap-start">
        <div
          className="sticky top-0 flex gap-4 items-center px-4 py-2 backdrop-blur z-10 select-none hover:cursor-pointer"
          onClick={onHistoryToggle}
        >
          <Icon
            icon={TbChevronRight}
            className={`w-6 h-6 transition-all ${
              isHistoryOpen ? 'rotate-90' : ''
            }`}
          />
          <p className="text-2xl font-bold">履歴</p>
          <Spacer />
          <button
            className="px-4 rounded-lg transition-all"
            aria-label="Remove history"
            name="Remove history"
            onClick={(e) => {
              e.stopPropagation();
              removeAll();
            }}
          >
            消去
          </button>
        </div>
        <div className="w-full rounded-xl px-2">
          <Collapse isOpen={isHistoryOpen}>
            <HistoryList />
          </Collapse>
        </div>
      </div>
      <div className="snap-start">
        <div
          className="sticky top-0 flex gap-4 items-center px-4 py-2 backdrop-blur z-10 select-none hover:cursor-pointer"
          ref={queueRef}
          onClick={onQueueToggle}
        >
          <Icon
            icon={TbChevronRight}
            className={`w-6 h-6 transition-all ${
              isQueueOpen ? 'rotate-90' : ''
            }`}
          />
          <p className="text-2xl font-bold">次に再生</p>
        </div>
        <div className="w-full px-2">
          <Collapse isOpen={isQueueOpen}>
            <QueueList />
          </Collapse>
        </div>
      </div>
      <Spacer />
      <div className="sticky bottom-0 w-full backdrop-blur">
        <AddToQueue />
      </div>
    </div>
  );
}
