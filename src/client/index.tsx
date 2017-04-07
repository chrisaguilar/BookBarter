import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './static/global.scss';

const styles = require('./styles.scss'); // tslint:disable-line

ReactDOM.render((
  <div className={ styles.main }>
    Hello, World!
  </div>
), document.getElementById('app'));

if (module.hot) module.hot.accept();
