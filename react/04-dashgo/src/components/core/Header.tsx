import {
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Box,
  Avatar,
} from '@chakra-ui/react';
import {
  RiNotificationLine,
  RiSearchLine,
  RiUserAddLine,
} from 'react-icons/ri';

export default function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
        dashgo
        <Text as="span" ml="1" color="pink.500">
          .
        </Text>
      </Text>

      <InputGroup
        as="label"
        maxW={400}
        bg="gray.800"
        borderRadius="full"
        py="4"
        px="8"
        alignSelf="center"
        position="relative"
        _hover={{
          cursor: 'text',
        }}
      >
        <Input
          color="gray.50"
          placeholder="Buscar na plataforma"
          variant="unstyled"
          _placeholder={{
            color: 'gray.400',
          }}
        />
        <InputRightElement
          mr="4"
          h="100%"
          fontSize="20"
          pointerEvents="none"
          children={<RiSearchLine />}
        />
      </InputGroup>

      <Flex align="center" ml="auto">
        <HStack
          spacing="8"
          mx="8"
          pr="8"
          py="1"
          color="gray.300"
          borderRightWidth={1}
          borderColor="gray.700"
        >
          <Icon as={RiNotificationLine} fontSize="20" />
          <Icon as={RiUserAddLine} fontSize="20" />
        </HStack>

        <Flex align="center">
          <Box mr="4" textAlign="right">
            <Text>João Vitor</Text>
            <Text color="gray.300" fontSize="small">
              jv.zaniolo@gmail.com
            </Text>
          </Box>

          <Avatar
            size="md"
            name="João Vitor"
            src="https://github.com/jvzaniolo.png"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
