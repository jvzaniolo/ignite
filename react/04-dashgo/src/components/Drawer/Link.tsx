import ActiveLink from '../ActiveLink'
import React, { ElementType } from 'react'
import {
  Text,
  Icon,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'

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
