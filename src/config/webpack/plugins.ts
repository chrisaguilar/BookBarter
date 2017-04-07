import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve } from 'path';
import * as webpack from 'webpack';

const p = process.env.NODE_ENV === 'production';

const {
  CheckerPlugin,
  TsConfigPathsPlugin
} = require('awesome-typescript-loader'); // tslint:disable-line

const plugins = [
  new CheckerPlugin(),
  new TsConfigPathsPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    filename: 'vendor.js',
    minChunks: Infinity,
    name: 'vendor'
  }),
  new HtmlWebpackPlugin({
    appMountId: 'app',
    cache: true,
    favicon: resolve('src/client/static/favicon.ico'),
    filename: 'index.html',
    hash: true,
    inject: false,
    minify: {
      collapseWhitespace: true,
      // maxLineLength: 80,
      useShortDoctype: true
    },
    mobile: true,
    // tslint:disable-next-line:no-require-imports
    template: require('html-webpack-template'),
    title: 'BookBarter'
  })
];

if (p) {
  plugins.push(
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'app.css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      mangle: false,
      sourceMap: true
    })
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
}

export { plugins };
