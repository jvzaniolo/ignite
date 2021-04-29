import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
} from 'react-icons/ri';

import Link from './Link';
import Category from './Category';

export default function Drawer() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <Category title="GERAL">
          <>
            <Link icon={RiDashboardLine} title="Dashboard" />
            <Link icon={RiContactsLine} title="Usuários" />
          </>
        </Category>
        <Category title="AUTOMAÇÃO">
          <>
            <Link icon={RiGitMergeLine} title="Formulários" />
            <Link icon={RiContactsLine} title="Automação" />
          </>
        </Category>
      </Stack>
    </Box>
  );
}
