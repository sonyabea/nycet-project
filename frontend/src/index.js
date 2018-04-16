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
import App from './App.jsx';
import NYCETAppReducers from './reducers/index';
import { loadMapData } from './actions/index';
import registerServiceWorker from './registerServiceWorker'

let store = createStore(NYCETAppReducers, applyMiddleware(thunkMiddleware))

//initially load top-level data, with no selection.
// store.dispatch(loadMapData(null))

// debugging helper
const announce = () => console.log(store.getState())
setInterval(announce, 7000)

//eventually, put a top level "Competetiveness" container component and allocate
//components per route -- e.g., detail pages etc.
ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
    <div>
      <Route path='/:parentDistType?/:parentDistId?' component={App} />
    </div>
  </BrowserRouter>
</Provider>,
  document.getElementById('root')
);

registerServiceWorker();
