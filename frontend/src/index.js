import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/app.jsx';
import Client from './containers/client.jsx';
import Help from './containers/help.jsx';
import '../public/styles/tailwind.css';

ReactDOM.render(
  <Client />
  , document.querySelector('.app'));
