import React from 'react'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { createRoot } from 'react-dom/client'
import thunk from 'redux-thunk'

import reducers from './reducers'
import App from './components/App'

const root = createRoot(document.getElementById('app'))
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})
