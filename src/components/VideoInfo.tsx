import { useOEmbed } from '@/hooks/youtube';
import { Box, Image, Text, VStack, css } from '@kuma-ui/core';

export default function VideoInfo({ id }: { id: string }) {
  const { data } = useOEmbed(id);

  return (
    <VStack gap={4}>
      <Box
        position="relative"
        overflow="hidden"
        borderRadius="lg"
        className={css`
          aspect-ratio: 16 / 9;
        `}
      >
        {data ? (
          <Image
            src={data?.thumbnail_url}
            alt="Thumbnail"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <Box
            width="100%"
            height="100%"
            bg='rgba(0 0 0 20)'
            className="h-full w-full animate-pulse bg-black/20"
          />
        )}
      </Box>
      {data ? (
        <VStack>
          <Text fontSize="x-large" fontWeight="bold" textOverflow="ellipsis">
            {data?.title}
          </Text>
          <Text>{data?.author_name}</Text>
        </VStack>
      ) : (
        <VStack gap={4} className="animate-pulse space-y-4">
          <Box height={4} width="80%" bg="rgba(0 0 0 20)" borderRadius="lg" />
          <Box height={4} width="50%" bg="rgba(0 0 0 20)" borderRadius="lg" />
        </VStack>
      )}
    </VStack>
  );
}
