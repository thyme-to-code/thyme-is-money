// @ts-check
import { extendTheme, theme as base } from '@chakra-ui/react'

const theme = extendTheme({
  components: {
    Select: {
      baseStyle: {
        icon: {
          right: '0.25em',
        },
      },
    },
  },
  colors: {
    brand: {
      50: '#fff',
      100: '#0CA789', // medium green
      200: '#0a876e', // dark green
      300: '#dcf4ef', // pale green
      400: '#5b605e', // medium gray
      500: '#4a4f4d', // dark gray
    },
    table: {
      100: '#bbd5cf',
    },
  },
  fonts: {
    heading: `Poppins, ${base.fonts?.heading}`,
    body: `${base.fonts?.body}`,
  },
})

export default theme
