import React from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { InputGroup, Input, InputRightElement } from '@chakra-ui/react';

export default function Search() {
  return (
    <InputGroup
      maxW={400}
      _focusWithin={{
        svg: {
          color: 'cyan.100',
        },
      }}
    >
      <Input
        type="text"
        borderRadius="full"
        placeholder="Buscar na plataforma"
      />
      <InputRightElement
        color="gray.600"
        pointerEvents="none"
        children={<RiSearchLine />}
      />
    </InputGroup>
  );
}
