import React, { cloneElement, ReactElement, useState } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
}

const ActiveLink = ({ children, ...props }: ActiveLinkProps) => {
  const { asPath } = useRouter()
  const [isActive, setIsActive] = useState(false)

  if (
    asPath === props.as ||
    asPath.includes === props.href ||
    asPath.includes(String(props.href))
  ) {
    setIsActive(true)
  }

  return (
    <Link {...props}>
      {cloneElement(children, {
        color: isActive ? 'cyan.500' : 'gray.200',
      })}
    </Link>
  )
}

export default ActiveLink
