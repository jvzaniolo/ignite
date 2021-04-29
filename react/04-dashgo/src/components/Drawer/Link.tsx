import React, { ElementType } from 'react';
import {
  Text,
  Icon,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';

interface LinkProps extends ChakraLinkProps {
  title: string;
  icon: ElementType;
}

export default function Link({ title, icon, ...props }: LinkProps) {
  return (
    <ChakraLink d="flex" align="center" {...props}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {title}
      </Text>
    </ChakraLink>
  );
}
