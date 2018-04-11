import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//async actions
import thunkMiddleware from 'redux-thunk';
//so we can actually use thunk
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Competitiveness from './App.jsx';
import NYCETAppReducers from './reducers/index';
import { loadMapData, storeMapData } from './actions/index';
export const assemblyLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/locational/nyad_geo.json'
export const electionLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/locational/nyed_geo.json'
export const assemblyDataLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/ad_margins.tsv'
export const electionDataLoc = 'https://raw.githubusercontent.com/cngonzalez/nycet-flatfiles/master/ed_margins.tsv'

let store = createStore(NYCETAppReducers, applyMiddleware(thunkMiddleware))
store.dispatch(loadMapData())

const announce = () => console.log(store.getState())

setInterval(announce, 7000)

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
    <div>
      <Route path='/' component={Competitiveness} />
    </div>
  </BrowserRouter>
</Provider>,
  document.getElementById('root')
);
