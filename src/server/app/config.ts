// tslint:disable:no-var-requires
// tslint:disable:no-require-imports
import * as express from 'express';
import { resolve } from 'path';
import * as webpack from 'webpack';

import webpackConfig from '~config/webpack';

const compiler = webpack(webpackConfig);
const p = process.env.NODE_ENV === 'production';

const config = express.Router();

const appConfig = [
  require('morgan')('dev'),
  require('compression')(),
  require('helmet')(),
  require('body-parser').json()
];

if (!p) {
  appConfig.push(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: '/'
    }),
    require('webpack-hot-middleware')(compiler, {
      noInfo: true
    })
  );
}
config.use(appConfig);

if (p) config.use('/', express.static(resolve('dist/client')));

export { config };
