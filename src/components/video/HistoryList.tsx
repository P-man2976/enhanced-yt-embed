import { useHistory } from '@/hooks/history';
import { usePlayer } from '@/hooks/player';
import React, { useCallback } from 'react';
import { ctxMenuID } from '../common/ContextMenu';
import VideoRow from './VideoRow';

const HistoryList = React.memo(() => {
  const { history } = useHistory();
  const { play } = usePlayer();

	const onTitleClick = useCallback(({ videoId }: Queue) => play(videoId), [])

  return history.length ? (
    <>
      {history?.map(({ id, videoId }) => (
        <div
          key={id}
          className="overflow-hidden border-b border-slate-500/40 first:rounded-t-xl last:rounded-b-xl last:border-none"
        >
          <VideoRow
            id={id}
            videoId={videoId}
            menuId={ctxMenuID}
            onTitleClick={onTitleClick}
          />
        </div>
      ))}
    </>
  ) : (
    <div className="grid h-full w-full py-4 grow place-content-center">
      <p className="text-slate-300">履歴がありません</p>
    </div>
  );
});

export default HistoryList;