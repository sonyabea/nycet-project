import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
//import App from './App';
import NYCETRouter from '../src/routes.js';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

const assemblyLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/locational/nyad_geo.json'
const electionLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/locational/nyed_geo.json'
const assemblyDataLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/ad_margins.tsv'
const electionDataLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/ed_margins.tsv'

ReactDOM.render((
  <BrowserRouter>
    <NYCETRouter />
  </BrowserRouter>
), document.getElementById('root'))

registerServiceWorker();
