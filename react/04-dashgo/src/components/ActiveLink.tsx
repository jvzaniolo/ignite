import React, { cloneElement, ReactElement } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
}

export default function ActiveLink({ children, ...props }: ActiveLinkProps) {
  let isActive = false
  const { asPath } = useRouter()

  if (
    asPath === props.as ||
    asPath.includes === props.href ||
    asPath.includes(String(props.href))
  ) {
    isActive = true
  }

  return (
    <Link {...props}>
      {cloneElement(children, {
        color: isActive ? 'cyan.500' : 'gray.200',
      })}
    </Link>
  )
}
