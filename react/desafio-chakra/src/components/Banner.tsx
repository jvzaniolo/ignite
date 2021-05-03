import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export default function Banner({ image, children }) {
  return (
    <Box bgSize="cover" bgImage={`url(${image})`}>
      {children}
    </Box>
  );
}
