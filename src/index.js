import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
//import App from './App';
import NYCETRouter from '../src/routes.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
    <NYCETRouter />
  </BrowserRouter>
), document.getElementById('root'))

registerServiceWorker();
