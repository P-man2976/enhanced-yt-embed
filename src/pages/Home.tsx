import YouTubePlayer from "@/components/youtube/YouTubePlayer";
import PlayingInfo from "@/components/player/PlayingInfo";
import Progress from "@/components/player/Progress";
import PlaybackControls from "@/components/player/PlaybackControls";
import Volume from "@/components/player/Volume";
import VideoQueue from "@/components/video/VideoQueue";

export default function Home() {
	return (
		<div className=" container mx-auto flex h-full w-full snap-x snap-mandatory grid-cols-2 grid-rows-1 flex-nowrap overflow-x-auto md:px-4 md:py-8 overflow-y-hidden md:grid md:snap-none md:gap-12 md:overflow-hidden">
			<div className="flex h-full w-screen shrink-0 snap-center flex-col justify-between gap-4 px-6 md:px-0 md:h-full md:w-full md:snap-align-none">
				<div className="flex h-full items-center justify-center">
					<YouTubePlayer />
				</div>
				<div className="flex h-full flex-col justify-evenly md:gap-8">
					<PlayingInfo />
					<Progress />
					<PlaybackControls />
					<div className="hidden md:block">
						<Volume />
					</div>
				</div>
			</div>
			<div className="flex h-full w-screen shrink-0 snap-center md:h-full md:w-full md:snap-align-none">
				<VideoQueue />
			</div>
		</div>
	);
}
