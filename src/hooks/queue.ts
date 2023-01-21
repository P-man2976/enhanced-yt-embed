import { queueAtom } from "@/atoms/player"
import { generateQueueID } from "@/modules/player";
import { useAtom } from "jotai"
import { useCallback } from "react";

export const useQueue = () => {
	const [queue, setQueue] = useAtom(queueAtom);

	const add = useCallback((videoId: string) => {
		setQueue((current) => [...current, { id: generateQueueID(), videoId }]);
	}, [setQueue]);

	const remove = useCallback((queueId: string) => {
		setQueue((current) => current.filter(({ id }) => id !== queueId))
	}, [setQueue]);


	return { queue, add, remove };
}