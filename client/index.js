import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './reducers/store'
import { Auth0Provider } from '@auth0/auth0-react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'

import theme from './theme/theme'
import './styles/index.scss'

import App from './components/App'

const container = document.getElementById('app')
const root = createRoot(container)
document.addEventListener('DOMContentLoaded', () => {
  root.render(
    <Auth0Provider
      domain="thyme-is-money.au.auth0.com"
      clientId="vrd0Ykva2cFUzMkyLc10F2Ns1vu1XoDU"
      audience="https://thyme-is-money/api"
      redirectUri={window.location.origin}
    >
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </ChakraProvider>
    </Auth0Provider>
  )
})
