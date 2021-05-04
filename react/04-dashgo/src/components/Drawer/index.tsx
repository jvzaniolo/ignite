import React from 'react'
import {
  Box,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from '@chakra-ui/react'

import Content from './Content'
import { useDrawer } from '../../contexts/DrawerContext'

export default function Drawer() {
  const { isOpen, onClose } = useDrawer()
  const floating = useBreakpointValue({
    base: true,
    lg: false,
  })

  if (floating) {
    return (
      <ChakraDrawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>

            <DrawerBody>
              <Content />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </ChakraDrawer>
    )
  }

  return (
    <Box as="aside" w="64" mr="8">
      <Content />
    </Box>
  )
}
