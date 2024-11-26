import { Box, BoxProps } from '@kuma-ui/core';
import { IconType } from 'react-icons/lib';

export default function Icon({
  icon,
  ...props
}: BoxProps & {
  icon: IconType;
}) {
  return <Box {...props}>{icon({ size: '100%' })}</Box>;
}
