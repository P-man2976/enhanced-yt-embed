import { Box, Flex, css } from '@kuma-ui/core';
import YouTubePlayer from '@/components/youtube/YouTubePlayer';
import PlayingInfo from '@/components/player/PlayingInfo';
import Progress from '@/components/player/Progress';
import PlaybackControls from '@/components/player/PlaybackControls';
import Volume from '@/components/player/Volume';
import VideoQueue from '@/components/video/VideoQueue';
import { SidebarContent } from '@/components/layout/Sidebar';

export default function Home() {
  return (
    <Box
      display={['flex', 'grid']}
      mx="auto"
      px={[0, '1rem']}
      py={[0, '2rem']}
      gridTemplateColumns="repeat(2, minmax(0, 1fr))"
      gridTemplateRows="repeat(1, minmax(0, 1fr))"
      flexWrap={['nowrap', 'unset']}
      gap={[0, '3rem']}
      height="100%"
      width="100%"
      maxWidth={['100%', '640px', '768px', '1024px', '1280px']}
      overflow={['auto', 'hidden']}
      className={css`
        scroll-snap-type: none;
        @media (max-width: md) {
          scroll-snap-type: x mandatory;
        }
      `}
      letterSpacing={0.5}
    >
      <Flex
        display={['flex', 'none']}
        height="100%"
        width={['100vw', '100%']}
        px={['1.5rem', '0']}
        flexShrink="0"
        flexDir="column"
        justify="space-between"
        gap={4}
        className={css`
          scroll-snap-align: center;
        `}
      >
        <SidebarContent />
      </Flex>
      <Flex
        height="100%"
        width={['100vw', '100%']}
        px={['1.5rem', '0']}
        flexShrink="0"
        flexDir="column"
        justify="space-between"
        gap={4}
        className={css`
          scroll-snap-align: center;
        `}
      >
        <Flex height="100%" alignItems="center" justify="center">
          <YouTubePlayer />
        </Flex>
        <Flex
          height="100%"
          flexDir="column"
          justify="space-evenly"
          gap={[0, 8]}
        >
          <PlayingInfo />
          <Progress />
          <PlaybackControls />
          <Box display={['none', 'block']}>
            <Volume />
          </Box>
        </Flex>
      </Flex>
      <Flex
        height="100%"
        width={['100vw', '100%']}
        flexShrink="0"
        className={css`
          scroll-snap-align: center;
        `}
      >
        <VideoQueue />
      </Flex>
    </Box>
  );
}
