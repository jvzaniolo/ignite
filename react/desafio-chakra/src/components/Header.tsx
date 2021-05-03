import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';
import { Flex, Image, Icon, IconButton } from '@chakra-ui/react';

export default function Header() {
  const { asPath } = useRouter();

  return (
    <Flex align="center" p="4">
      {asPath !== '/' && (
        <Link href="/" passHref>
          <IconButton
            as="a"
            variant="ghost"
            position="absolute"
            borderRadius="full"
            aria-label="Go back"
            icon={<Icon as={FiArrowLeft} />}
          />
        </Link>
      )}
      <Image
        src="/images/logo.svg"
        alt="World Trip"
        h={['6', '10']}
        mx="auto"
      />
    </Flex>
  );
}
