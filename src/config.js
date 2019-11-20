import { layoutViews } from 'volto-mosaic';
import * as reducers from './reducers';

export const breakpoints = { lg: 1549, md: 1086, sm: 718, xs: 480, xxs: 0 };
export const screenSizes = {
  lg: 'Desktop (default)',
  md: 'Laptop',
  sm: 'Tablet',
  xs: 'Phone',
  xxs: 'Small screen',
};
export const rowHeight = 21;

export function applyConfig(config) {
  return {
    ...config,
    reducers: {
      ...config.reducers,
      ...reducers,
    },
  };
}
