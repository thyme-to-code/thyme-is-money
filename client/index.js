import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './reducers/store'

import App from './components/App'

const container = document.getElementById('app')
const root = createRoot(container)
document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})
