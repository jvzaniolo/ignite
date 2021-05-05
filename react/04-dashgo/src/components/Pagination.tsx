import React from 'react'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import {
  Box,
  Button,
  Stack,
  Text,
  HStack,
  IconButton,
  Icon,
  Tooltip,
} from '@chakra-ui/react'

import queryClient from '../services/queryClient'
import { getUsers } from '../services/hooks/useUserQuery'

interface PaginationProps {
  page: number
  total: number
  pageSize?: number
  onPageChange: (page: number) => void
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter(page => page > 0)
}

export default function Pagination({
  total,
  page = 1,
  pageSize = 10,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.floor(total / pageSize)
  const previousPages =
    page > 1 ? generatePagesArray(page - 1 - siblingsCount, page - 1) : []
  const nextPages =
    page >= 1
      ? generatePagesArray(page, Math.min(page + siblingsCount, lastPage))
      : []

  async function handlePrefetchPage(page: number) {
    await queryClient.prefetchQuery(['users', page], () => getUsers(page), {
      staleTime: 1000 * 60 * 10,
    })
  }

  return (
    <Stack
      mt="8"
      spacing="6"
      align="center"
      justify="space-between"
      direction={['column', 'row']}
    >
      <Box>
        <strong>{page * pageSize - pageSize}</strong>-
        <strong>{page * pageSize}</strong> de <strong>{total}</strong>
      </Box>
      <HStack spacing="2">
        {page > 1 + siblingsCount && (
          <>
            <Tooltip label="Primeira página" placement="top" hasArrow>
              <IconButton
                w="4"
                size="sm"
                fontSize="sm"
                variant="outline"
                colorScheme="gray"
                aria-label="Primeira página"
                icon={<Icon as={FiChevronsLeft} />}
                onClick={() => onPageChange(1)}
              />
            </Tooltip>

            {page > 1 + siblingsCount && <Text px="1">...</Text>}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map(prevPage => {
            return (
              <Button
                key={prevPage}
                w="4"
                size="sm"
                fontSize="xs"
                variant="outline"
                colorScheme="gray"
                onClick={() => onPageChange(prevPage)}
              >
                {prevPage}
              </Button>
            )
          })}

        <Button
          w="4"
          size="sm"
          fontSize="xs"
          colorScheme="cyan"
          disabled
          _disabled={{ bgColor: 'cyan', cursor: 'default' }}
        >
          {page}
        </Button>

        {nextPages.length > 0 &&
          nextPages.map(nextPage => {
            return (
              <Button
                key={nextPage}
                w="4"
                size="sm"
                fontSize="xs"
                variant="outline"
                colorScheme="gray"
                onClick={() => onPageChange(nextPage)}
                onMouseEnter={() => handlePrefetchPage(nextPage)}
              >
                {nextPage}
              </Button>
            )
          })}

        {page + siblingsCount < lastPage && (
          <>
            {page + 1 + siblingsCount < lastPage && <Text px="1">...</Text>}

            <Tooltip label="Última página" placement="top" hasArrow>
              <IconButton
                w="4"
                size="sm"
                fontSize="sm"
                variant="outline"
                colorScheme="gray"
                aria-label="Última página"
                icon={<Icon as={FiChevronsRight} />}
                onClick={() => onPageChange(lastPage)}
              />
            </Tooltip>
          </>
        )}
      </HStack>
    </Stack>
  )
}
