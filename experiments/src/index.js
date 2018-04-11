import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { loadData } from './actions'
import App from './App'
import './index.css'

const middleware = [ thunk ]
const store = createStore(
  reducer, applyMiddleware(...middleware)
)

store.dispatch(loadData())

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))
