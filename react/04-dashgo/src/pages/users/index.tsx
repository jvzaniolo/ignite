import React from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
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
} from '@chakra-ui/react';

import Header from '../../components/Header';
import Drawer from '../../components/Drawer';
import Pagination from '../../components/Pagination';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export default function Users() {
  const { data, isLoading, error } = useQuery<User[]>(
    'users',
    async () => {
      const response = await fetch('http://localhost:3000/api/users');
      const data = await response.json();

      return data.users.map((user: User) => ({
        ...user,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      }));
    },
    { staleTime: Infinity }
  );
  const isLargeBreakpoint = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />

      <Flex flex="1" my="6" maxW={1480} mx="auto" px="6">
        <Drawer />

        <Box flex="1" borderRadius="base" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>

            <Link href="/users/create" passHref>
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
            </Link>
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
                  {data.map(user => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="cyan" />
                      </Td>

                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
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

              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
