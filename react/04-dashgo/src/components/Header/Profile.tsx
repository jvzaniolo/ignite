import React from 'react';
import { Flex, Box, Avatar, Text } from '@chakra-ui/react';

export default function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>João Vitor</Text>
        <Text color="gray.300" fontSize="small">
          jv.zaniolo@gmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="João Vitor"
        src="https://github.com/jvzaniolo.png"
      />
    </Flex>
  );
}
