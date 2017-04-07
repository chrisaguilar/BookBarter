import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import { resolve as res } from 'path';

const p = process.env.NODE_ENV === 'production';

const include = [
  res('src/client')
];

const css = {
  loader: 'css-loader',
  query: {
    importLoaders: 1,
    localIdentName: p ? '[hash:base64:5]' : '[name]__[local]__[hash:base64:5]',
    modules: true,
    sourceMap: true
  }
};

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins () {
      return [
        require('postcss-cssnext') // tslint:disable-line:no-require-imports
      ];
    }
  }
};

const sass = 'sass-loader?sourceMap';

const style = 'style-loader?sourceMap';

export const styles = {
  include: include.concat(res('node_modules')),
  loader: p ?
    ExtractTextPlugin.extract({
      fallback: style,
      use: [ css, postcss, sass ]
    }) : [ style, css, postcss, sass ],
  test: /\.(s[ca]|c)ss$/
};

export const ts = {
  test: /\.tsx?$/,
  include,
  use: [
    {
      loader: 'awesome-typescript-loader',
      query: {
        transpileOnly: true,
        useBabel: true,
        useCache: true,
        usePrecompiledFiles: true
      }
    }
  ]
};

export const tslint = {
  enforce: 'pre',
  test: /\.tsx?$/,
  include,
  use: [
    {
      loader: 'tslint-loader',
      options: {
        emitErrors: false,
        extends: res('tslint.json'),
        failOnHint: false,
        fix: false,
        formatter: 'stylish',
        typeCheck: true
      }
    }
  ]
};
