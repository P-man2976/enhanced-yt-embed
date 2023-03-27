
export const getYouTubeID = (url?: string) => {
	return url?.match(
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|live\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
  )?.[1];
}