import { Flex, Button, Stack } from '@chakra-ui/react';

import Input from '../components/Input';

export default function SignIn() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        p="8"
        w="100%"
        maxW={360}
        bg="gray.800"
        flexDir="column"
        borderRadius="base"
      >
        <Stack spacing="4">
          <Input
            label="E-mail"
            name="email"
            type="email"
            bgColor="gray.900"
            focusBorderColor="cyan.500"
            variant="filled"
            size="lg"
          />

          <Input
            label="Senha"
            name="password"
            type="password"
            bgColor="gray.900"
            focusBorderColor="cyan.500"
            variant="filled"
            size="lg"
          />
        </Stack>

        <Button type="submit" mt="6" size="lg" colorScheme="cyan">
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
