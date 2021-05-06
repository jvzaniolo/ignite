import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import {
  FormLabel,
  FormControl,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  error?: {
    message: string
  }
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error, ...rest },
  ref
) => (
  <FormControl id={name} isInvalid={!!error}>
    {label && <FormLabel>{label}</FormLabel>}
    <ChakraInput ref={ref} name={name} {...rest} />
    <FormErrorMessage>{error?.message}</FormErrorMessage>
  </FormControl>
)

export default forwardRef(Input)
