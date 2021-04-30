import React from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';

import Header from '../../components/Header';
import Drawer from '../../components/Drawer';
import Input from '../../components/Input';

export default function CreateUser() {
  return (
    <Box>
      <Header />

      <Flex flex="1" my="6" maxW={1480} mx="auto" px="6">
        <Drawer />

        <Box flex="1" borderRadius="base" bg="gray.800" p={['6', '8']}>
          <Heading size="lg" fontWeight="normal">
            Criar Usuário
          </Heading>
          <Divider my="6" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input name="name" label="Nome completo" />
              <Input name="email" type="email" label="E-mail" />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input name="password" type="password" label="Senha" />
              <Input name="password" type="password" label="Confirmar senha" />
            </SimpleGrid>
          </VStack>

          <ButtonGroup mt="8" float="right" colorScheme="cyan">
            <Link href="/users" passHref>
              <Button w="24" variant="ghost">
                Cancel
              </Button>
            </Link>
            <Button w="24">Save</Button>
          </ButtonGroup>
        </Box>
      </Flex>
    </Box>
  );
}
