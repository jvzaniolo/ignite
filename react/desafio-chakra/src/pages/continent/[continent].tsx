import React from 'react';
import { FiInfo } from 'react-icons/fi';
import {
  Center,
  Text,
  Heading,
  Stack,
  Box,
  Icon,
  Tooltip,
  Image,
  Flex,
} from '@chakra-ui/react';

import Banner from '../../components/Banner';
import Header from '../../components/Header';

export default function Continent() {
  return (
    <>
      <Banner image="/images/background.png">
        <Flex
          px={['4', '24']}
          py={['6', '12']}
          h="sm"
          justifyContent={['center', 'flex-start']}
          alignItems={['center', 'flex-end']}
        >
          <Heading color="whiteAlpha.900" as="h1" size="lg">
            Europa
          </Heading>
        </Flex>
      </Banner>

      <Stack spacing="8" p="5">
        <Text as="p">
          A Europa é, por convenção, um dos seis continentes do mundo.
          Compreendendo a península ocidental da Eurásia, a Europa geralmente
          divide-se da Ásia a leste pela divisória de águas dos montes Urais, o
          rio Ural, o mar Cáspio, o Cáucaso, e o mar Negro a sudeste
        </Text>

        <Stack direction="row" color="gray.800" spacing="24">
          <div>
            <Text color="primary" fontWeight="bold" fontSize="3xl">
              50
            </Text>
            <span>países</span>
          </div>

          <div>
            <Text color="primary" fontWeight="bold" fontSize="3xl">
              60
            </Text>
            <span>línguas</span>
          </div>

          <div>
            <Text color="primary" fontWeight="bold" fontSize="3xl">
              24
            </Text>
            <Text d="flex" alignItems="center">
              cidades +100
              <Tooltip label="Alguma coisa por aqui" hasArrow placement="top">
                <Text as="span" ml="2">
                  <Icon as={FiInfo} color="gray.300" />
                </Text>
              </Tooltip>
            </Text>
          </div>
        </Stack>

        <Heading fontSize="2xl" color="gray.600" fontWeight="medium">
          Cidades +100
        </Heading>

        <Stack px="12" spacing="8">
          <Box boxShadow="lg" borderRadius="lg" overflow="hidden">
            <Image w="100%" alt="Londres" src="/images/europe.png" />
            <Flex direction="column" px="10" py="4">
              <Heading>Londres</Heading>
              <Text>Reino Unido</Text>
            </Flex>
          </Box>

          <Box boxShadow="lg" borderRadius="lg" overflow="hidden">
            <Image w="100%" alt="Londres" src="/images/europe.png" />
            <Flex direction="column" px="10" py="4">
              <Heading>Londres</Heading>
              <Text>Reino Unido</Text>
            </Flex>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
