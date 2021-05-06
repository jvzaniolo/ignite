import React from 'react'
import { RiMenuLine } from 'react-icons/ri'
import {
  Flex,
  Icon,
  IconButton,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'

import Search from './Search'
import Profile from './Profile'
import Notification from './Notification'
import { useDrawer } from '../../contexts/DrawerContext'

export default function Header() {
  const { onOpen } = useDrawer()
  const isLargeBreakpoint = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
      justifyContent="flex-start"
    >
      {!isLargeBreakpoint && (
        <IconButton
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          aria-label="Open Drawer"
          mr="2"
        ></IconButton>
      )}
      <Text
        w="64"
        fontWeight="bold"
        letterSpacing="tight"
        fontSize={['2xl', '3xl']}
      >
        dashgo
        <Text as="span" ml="1" color="cyan.500">
          .
        </Text>
      </Text>

      {isLargeBreakpoint && <Search />}

      <Flex align="center" ml="auto">
        <Notification />

        <Profile showUserInfo={isLargeBreakpoint} />
      </Flex>
    </Flex>
  )
}
