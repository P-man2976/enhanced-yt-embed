import { queueAtom } from '@/atoms/player';
import { usePlayer } from '@/hooks/player';
import { Reorder, useDragControls } from 'framer-motion';
import { useAtom } from 'jotai';
import React, { useCallback } from 'react';
import { queueMenuID } from '../common/ContextMenu';
import VideoRow from './VideoRow';

const QueueList = React.memo(() => {
  const [[current, ...queue], setQueue] = useAtom(queueAtom);

  return queue.length ? (
    <Reorder.Group
  
      axis="y"
      values={queue}
      onReorder={(newOrder) => setQueue([current, ...newOrder])}
      layoutScroll
    >
      {queue.map((video) => (
        <QueueItem key={video.id} video={video} />
      ))}
    </Reorder.Group>
  ) : (
    <div className="grid h-full w-full py-4 grow place-content-center">
      <p className="text-slate-300">キューが空です</p>
    </div>
  );
});

function QueueItem({ video }: { video: Queue }) {
  const { skipTo } = usePlayer();
  const controls = useDragControls();
  const onTitleClick = useCallback(({ id }: Queue) => skipTo(id), []);

  return (
    <Reorder.Item
      className="overflow-hidden border-b border-slate-500/40 first:rounded-t-xl last:rounded-b-xl last:border-none"
      key={video.id}
      value={video}
      dragListener={false}
      dragControls={controls}
    >
      <VideoRow
        id={video.id}
        videoId={video.videoId}
        menuId={queueMenuID}
        onTitleClick={onTitleClick}
        onDrag={(e) => controls.start(e)}
      />
    </Reorder.Item>
  );
}

export default QueueList;