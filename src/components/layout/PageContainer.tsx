import { Box, css } from '@kuma-ui/core';
import { ReactNode } from 'react';

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <Box
      className={css`
        background: linear-gradient(
          to bottom,
          rgb(38 38 38),
          rgb(23 23 23)
        );
        color: rgb(248 250 252);
				position: fixed;
				height: 100dvh;
				width: 100%;
				overscroll-behavior: none;
				padding-bottom: env(safe-area-inset-bottom);
      `}
    >
      {children}
    </Box>
  );
}
