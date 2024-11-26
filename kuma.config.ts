import { createTheme } from '@kuma-ui/core';

const theme = createTheme({
  colors: {
    neutral: {
      50: 'rgb(250 250 250)',
      100: 'rgb(245 245 245)',
      200: 'rgb(229 229 229)',
      300: 'rgb(212 212 212)',
      400: 'rgb(163 163 163)',
      500: 'rgb(115 115 115)',
      600: 'rgb(82 82 82)',
      700: 'rgb(64 64 64)',
      800: 'rgb(38 38 38)',
      900: 'rgb(23 23 23)',
      950: 'rgb(10 10 10)',
    },
    slate: {
      50: 'rgb(248 250 252)',
      100: 'rgb(241 245 249)',
      200: 'rgb(226 232 240)',
      300: 'rgb(203 213 225)',
      400: 'rgb(148 163 184)',
      500: 'rgb(100 116 139)',
      600: 'rgb(71 85 105)',
      700: 'rgb(51 65 85)',
      800: 'rgb(30 41 59)',
      900: 'rgb(15 23 42)',
      950: 'rgb(2 6 23)',
    },
  },
});

type UserTheme = typeof theme;

declare module '@kuma-ui/core' {
  export interface Theme extends UserTheme {}
}

export default theme;