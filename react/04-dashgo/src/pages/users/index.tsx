import React, { useState } from 'react'
import NextLink from 'next/link'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useBreakpointValue,
  Icon,
  Center,
  Spinner,
} from '@chakra-ui/react'

import Header from '../../components/Header'
import Drawer from '../../components/Drawer'
import Pagination from '../../components/Pagination'
import useUserQuery, { getUsers } from '../../services/hooks/useUserQuery'
import { GetServerSideProps } from 'next'

export default function Users({ users }) {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error } = useUserQuery(page, {
    initialData: users
  })
  const isLargeBreakpoint = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Box>
      <Header />

      <Flex flex="1" my="6" maxW={1480} mx="auto" px="6">
        <Drawer />

        <Box flex="1" borderRadius="base" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="md"
                cursor="pointer"
                colorScheme="cyan"
              >
                <Icon as={RiAddLine} mr={isLargeBreakpoint ? '2' : 0} />
                {isLargeBreakpoint && 'Criar novo'}
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Center>
              <Spinner />
            </Center>
          ) : error ? (
            <Center>
              <Text>Falha ao obter dados dos usuários..</Text>
            </Center>
          ) : (
            <>
              <Table colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color="gray.300" w="8">
                      <Checkbox colorScheme="cyan" />
                    </Th>

                    <Th>Usuário</Th>
                    {isLargeBreakpoint && <Th>Data de cadastro</Th>}
                    <Th w="8" textAlign="right">
                      {!isLargeBreakpoint && 'Editar'}
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map(user => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="cyan" />
                      </Td>

                      <Td>
                        <Box>
                          <Text as="a" fontWeight="bold">
                            {user.name}
                          </Text>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isLargeBreakpoint && <Td>{user.createdAt}</Td>}
                      <Td textAlign="right">
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          cursor="pointer"
                          variant="ghost"
                          colorScheme="cyan"
                        >
                          <Icon
                            as={RiPencilLine}
                            mr={isLargeBreakpoint ? '2' : 0}
                          />
                          {isLargeBreakpoint && 'Editar'}
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination
                page={page}
                total={data.total}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const {users, total} = await getUsers(1)

  return {
    props: {
      users,
    }
  }
}
