import { resolve } from 'path';

const entry = {
  index: [ 'normalize.css', resolve('src/client') ],
  polyfills: [ 'babel-polyfill', 'whatwg-fetch' ],
  vendor: [ 'react', 'react-dom' ]
};

if (!(process.env.NODE_ENV === 'production')) {
  const wpHMR = 'webpack-hot-middleware/client?reload=true&timeout=2000';
  entry.index.unshift(wpHMR);
  entry.vendor.unshift(wpHMR);
}

export { entry };
