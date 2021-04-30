import React from 'react';
import { Stack } from '@chakra-ui/react';
import {
  RiDashboardLine,
  RiContactsLine,
  RiGitMergeLine,
} from 'react-icons/ri';

import Link from './Link';
import Category from './Category';

export default function Content() {
  return (
    <Stack spacing="12" align="flex-start">
      <Category title="GERAL">
        <>
          <Link href="/dashboard" icon={RiDashboardLine} title="Dashboard" />
          <Link href="/users" icon={RiContactsLine} title="Usuários" />
        </>
      </Category>
      <Category title="AUTOMAÇÃO">
        <>
          <Link href="/forms" icon={RiGitMergeLine} title="Formulários" />
          <Link href="/automation" icon={RiContactsLine} title="Automação" />
        </>
      </Category>
    </Stack>
  );
}
