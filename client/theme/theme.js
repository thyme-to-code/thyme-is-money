import { extendTheme, theme as base } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      50: '#fff',
      100: '#0CA789',
      200: '#0a876e',
      300: '#dcf4ef',
    },
  },
  fonts: {
    heading: `Poppins, ${base.fonts?.heading}`,
    body: `${base.fonts?.body}`,
  },
})

export default theme
