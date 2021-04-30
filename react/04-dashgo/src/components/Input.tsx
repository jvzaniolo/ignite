import { forwardRef, ForwardRefRenderFunction } from 'react';
import {
  FormLabel,
  FormControl,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, ...rest },
  ref
) => (
  <FormControl id={name}>
    {label && <FormLabel>{label}</FormLabel>}
    <ChakraInput ref={ref} name={name} {...rest} />
  </FormControl>
);

export default forwardRef(Input);
