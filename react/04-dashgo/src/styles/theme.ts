import { extendTheme } from '@chakra-ui/react'

export default extendTheme({
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        color: 'gray.50',
        bg: 'gray.900',
      },
    },
  },
  config: {
    initialColorMode: 'dark',
  },
})
