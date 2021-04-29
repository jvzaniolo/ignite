import React from 'react';
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
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import Header from '../../components/Header';
import Drawer from '../../components/Drawer';
import Pagination from '../../components/Pagination';

export default function Users() {
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

            <Button
              as="a"
              size="sm"
              fontSize="md"
              cursor="pointer"
              colorScheme="cyan"
              leftIcon={<RiAddLine />}
            >
              Criar novo
            </Button>
          </Flex>

          <Table colorScheme="gray">
            <Thead>
              <Tr>
                <Th px="6" color="gray.300" w="8">
                  <Checkbox colorScheme="cyan" />
                </Th>

                <Th>Usuário</Th>
                <Th>Data de cadastro</Th>
                <Th w="8" />
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px="6">
                  <Checkbox colorScheme="cyan" />
                </Td>

                <Td>
                  <Box>
                    <Text fontWeight="bold">João Vitor</Text>
                    <Text fontSize="sm" color="gray.300">
                      jv.zaniolo@gmail.com
                    </Text>
                  </Box>
                </Td>
                <Td>04 de Abril, 2021</Td>
                <Td textAlign="right">
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    cursor="pointer"
                    variant="ghost"
                    colorScheme="cyan"
                    leftIcon={<RiPencilLine />}
                  >
                    Editar
                  </Button>
                </Td>
              </Tr>

              <Tr>
                <Td px="6">
                  <Checkbox colorScheme="cyan" />
                </Td>

                <Td>
                  <Box>
                    <Text fontWeight="bold">João Vitor</Text>
                    <Text fontSize="sm" color="gray.300">
                      jv.zaniolo@gmail.com
                    </Text>
                  </Box>
                </Td>
                <Td>04 de Abril, 2021</Td>
                <Td textAlign="right">
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    cursor="pointer"
                    variant="ghost"
                    colorScheme="cyan"
                    leftIcon={<RiPencilLine />}
                  >
                    Editar
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}
