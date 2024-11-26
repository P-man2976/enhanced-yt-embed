import { Button, Text, VStack } from '@kuma-ui/core';
import { FallbackProps } from 'react-error-boundary';

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <VStack
      position="fixed"
      width="100%"
      height="100%"
      alignItems="center"
      justify="center"
			gap='3rem'
    >
      <Text as='code'>{error.message}</Text>
			<Text as='pre' fontSize='small'>{error.stack}</Text>
			<Button  onClick={() => location.assign('/')}>reset</Button>
    </VStack>
  );
}
