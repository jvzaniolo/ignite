import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BsDot } from 'react-icons/bs';
import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  Divider,
  Center,
  Image,
} from '@chakra-ui/react';

import Banner from '../components/Banner';

SwiperCore.use([Navigation, Pagination]);

export default function Home() {
  return (
    <>
      <Banner image="/images/background.png">
        <Box px="4" py="6">
          <Heading color="whiteAlpha.900" as="h1" size="lg">
            5 Continentes, <br />
            infinitas possibilidades.
          </Heading>
          <Text color="whiteAlpha.900" mt="2">
            Chegou a hora de tirar do papel a viagem que você sempre sonhou.
          </Text>
        </Box>
      </Banner>

      <Box py="9">
        <List
          d="flex"
          fontSize="xl"
          flexWrap="wrap"
          color="gray.600"
          fontWeight="medium"
          justifyContent="center"
          gridColumnGap="24"
          gridRowGap="6"
        >
          <ListItem d="flex" align="center">
            <ListIcon as={BsDot} boxSize={8} color="primary" />
            vida noturna
          </ListItem>
          <ListItem d="flex" align="center">
            <ListIcon as={BsDot} boxSize={8} color="primary" />
            praia
          </ListItem>
          <ListItem d="flex" align="center">
            <ListIcon as={BsDot} boxSize={8} color="primary" />
            moderno
          </ListItem>
          <ListItem d="flex" align="center">
            <ListIcon as={BsDot} boxSize={8} color="primary" />
            clássico
          </ListItem>
          <ListItem d="flex" align="center">
            <ListIcon as={BsDot} boxSize={8} color="primary" />e mais...
          </ListItem>
        </List>
      </Box>

      <Center>
        <Divider w={50} borderColor="gray.900" />
      </Center>

      <Center flexDir="column" py="5">
        <Text as="h2" fontSize="2xl" color="gray.600">
          Vamos nessa?
        </Text>
        <Text as="h2" fontSize="2xl" color="gray.600">
          Então escolha seu continente
        </Text>
      </Center>

      <Box h={250} mb="6">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          style={{
            height: 'inherit',
          }}
        >
          <SwiperSlide>
            <Center h="100%" flexDir="column">
              <Image
                h="100%"
                w="100%"
                src="/images/europe.png"
                alt="Europa"
                pos="absolute"
                objectFit="cover"
                zIndex="hide"
              />
              <Heading color="white">Europa</Heading>
              <Text color="whiteAlpha.800" fontWeight="bold">
                O continente mais antigo.
              </Text>
            </Center>
          </SwiperSlide>
          <SwiperSlide>
            <Center h="100%" flexDir="column">
              <Image
                h="100%"
                w="100%"
                src="/images/brasil.jpeg"
                alt="Europa"
                pos="absolute"
                objectFit="cover"
                zIndex="hide"
                filter="brightness(0.7)"
              />
              <Heading color="white">Brasil</Heading>
              <Text color="whiteAlpha.800" fontWeight="bold">
                A terra do café
              </Text>
            </Center>
          </SwiperSlide>
          <SwiperSlide>
            <Center h="100%" flexDir="column">
              <Image
                h="100%"
                w="100%"
                src="/images/europe.png"
                alt="Europa"
                pos="absolute"
                objectFit="cover"
                zIndex="hide"
              />
              <Heading color="white">Europa</Heading>
              <Text color="whiteAlpha.800" fontWeight="bold">
                O continente mais antigo.
              </Text>
            </Center>
          </SwiperSlide>
        </Swiper>
      </Box>
    </>
  );
}
