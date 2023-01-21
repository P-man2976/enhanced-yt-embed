import { useQueue } from '@/hooks/queue';
import copy from 'copy-to-clipboard';
import { Menu, Item, Separator } from 'react-contexify';
import { TbBrandYoutube, TbLink, TbPlaylistAdd, TbPlaylistX } from 'react-icons/tb';
import Icon from './Icon';

export const ctxMenuID = 'context_menu';
export const queueMenuID = 'context_menu_queue';

export default function ContextMenu({ menuId }: { menuId: string }) {
  const { queue, add, remove } = useQueue();

  return (
    <Menu id={menuId}>
      {menuId === queueMenuID ? (
        <Item
          className="bg-red-500/50"
          onClick={({ props }) => remove(props.id)}
        >
          <Icon className="mr-2 h-5 w-5" icon={TbPlaylistX} />
          キューから削除
        </Item>
      ) : (
        <Item onClick={({ props }) => add(props.videoId)}>
          <Icon className="mr-2 h-5 w-5" icon={TbPlaylistAdd} />
          キューに追加
        </Item>
      )}
			<Separator />
      <Item onClick={({ props }) => open(`https://youtu.be/${props.videoId}`)}>
        <Icon className="mr-2 h-5 w-5" icon={TbBrandYoutube} />
        YouTubeで開く
      </Item>
      <Item onClick={({ props }) => copy(`https://youtu.be/${props.videoId}`)}>
        <Icon className="mr-2 h-5 w-5" icon={TbLink} />
        リンクをコピー
      </Item>
    </Menu>
  );
}
