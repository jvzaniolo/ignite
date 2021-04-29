import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  label?: string;
  name: string;
}

export default function Input({ label, name, ...props }: InputProps) {
  return (
    <FormControl id={name}>
      {label && <FormLabel>{label}</FormLabel>}
      <ChakraInput name={name} {...props} />
    </FormControl>
  );
}
