import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useOEmbed = (videoId: string) =>
  useQuery<OEmbed, AxiosError>(
    ['yt', 'oembed', videoId],
    async () =>
      (
        await axios.get('https://youtube.com/oembed', {
          params: {
            format: 'json',
            url: `https://youtu.be/${videoId}`,
          },
        })
      ).data,
      {
        enabled: !!videoId,
        retryOnMount: false,
      }
  );