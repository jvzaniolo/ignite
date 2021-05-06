import React, { ElementType } from 'react'
import {
  Text,
  Icon,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'

import ActiveLink from '../ActiveLink'

interface LinkProps extends ChakraLinkProps {
  href: string
  title: string
  icon: ElementType
}

export default function Link({ title, icon, href, ...props }: LinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink d="flex" align="center" {...props}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {title}
        </Text>
      </ChakraLink>
    </ActiveLink>
  )
}
