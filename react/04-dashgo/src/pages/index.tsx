import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Flex, Button, Stack } from '@chakra-ui/react'

import Input from '../components/Input'

type SignInData = {
  email: string
  password: string
}

const signInSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória'),
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInSchema),
  })

  const handleSignIn: SubmitHandler<SignInData> = async data => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
  }

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
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            label="E-mail"
            name="email"
            type="email"
            error={formState.errors.email}
            size="lg"
            variant="filled"
            bgColor="gray.900"
            focusBorderColor="cyan.500"
            {...register('email')}
          />

          <Input
            label="Senha"
            name="password"
            type="password"
            error={formState.errors.password}
            bgColor="gray.900"
            focusBorderColor="cyan.500"
            variant="filled"
            size="lg"
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          size="lg"
          colorScheme="cyan"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
