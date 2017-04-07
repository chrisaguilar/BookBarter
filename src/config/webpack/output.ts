import { resolve } from 'path';

export const output = {
  filename: '[name].js',
  path: resolve('dist/client'),
  pathinfo: true,
  publicPath: '/'
};
