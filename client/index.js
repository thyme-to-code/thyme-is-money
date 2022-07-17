import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './reducers/store'
import { Auth0Provider } from '@auth0/auth0-react'

import App from './components/App'

const container = document.getElementById('app')
const root = createRoot(container)
document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <Auth0Provider domain='thyme-is-money.au.auth0.com' clientId='vrd0Ykva2cFUzMkyLc10F2Ns1vu1XoDU' audience='https://thyme-is-money/api'>
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  )
})
