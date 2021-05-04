import React, { ReactElement } from 'react'
import { Box, Text, Stack } from '@chakra-ui/react'

interface CategoryProps {
  title: string
  children: ReactElement
}

export default function Category({ title, children }: CategoryProps) {
  return (
    <Box>
      <Text fontWeight="bold" color="gray.500" fontSize="small">
        {title}
      </Text>
      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  )
}
