import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';

export default function Header() {
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
      <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
        dashgo
        <Text as="span" ml="1" color="cyan.500">
          .
        </Text>
      </Text>

      <Search />

      <Flex align="center" ml="auto">
        <Notification />

        <Profile />
      </Flex>
    </Flex>
  );
}
