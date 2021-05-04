import { extendTheme, theme } from '@chakra-ui/react'

export default extendTheme({
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
      },
    },
  },
  config: {
    initialColorMode: 'dark',
  },
})
