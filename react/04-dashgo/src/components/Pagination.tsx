import React from 'react';
import { Box, Button, HStack } from '@chakra-ui/react';

export default function Pagination() {
  return (
    <HStack mt="8" spacing="6" align="center" justify="space-between">
      <Box>
        <strong>0</strong>-<strong>10</strong> de <strong>100</strong>
      </Box>
      <HStack spacing="2">
        <Button
          w="4"
          size="sm"
          fontSize="xs"
          colorScheme="cyan"
          disabled
          _disabled={{ bgColor: 'cyan', cursor: 'default' }}
        >
          1
        </Button>
        <Button
          w="4"
          size="sm"
          fontSize="xs"
          bg="gray.700"
          _hover={{
            bg: 'gray.500',
          }}
        >
          2
        </Button>
        <Button
          w="4"
          size="sm"
          fontSize="xs"
          bg="gray.700"
          _hover={{
            bg: 'gray.500',
          }}
        >
          3
        </Button>
      </HStack>
    </HStack>
  );
}
