import React from 'react';
import Link from 'next/link';
import { BsDot } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
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
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';

import Banner from '../components/Banner';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Home = () => (
  <>
    <Banner image="/images/background.png">
      <Box px={['4', '24']} py="12">
        <Heading color="whiteAlpha.900" as="h1" size="lg">
          2 Continentes, <br />
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
        autoplay={{ delay: 1000 * 10 }}
        pagination={{ clickable: true }}
        style={{
          height: 'inherit',
        }}
      >
        <SwiperSlide>
          <LinkBox h="100%">
            <Image
              h="100%"
              w="100%"
              src="/images/europe.png"
              alt="Europa"
              pos="absolute"
              objectFit="cover"
              zIndex="hide"
            />
            <Center h="100%" flexDir="column">
              <Heading color="white">
                <Link href="/continent/europe" passHref>
                  <LinkOverlay>Europa</LinkOverlay>
                </Link>
              </Heading>
              <Text color="whiteAlpha.800" fontWeight="bold">
                O continente mais antigo.
              </Text>
            </Center>
          </LinkBox>
        </SwiperSlide>
        <SwiperSlide>
          <LinkBox h="100%">
            <Image
              h="100%"
              w="100%"
              src="/images/brasil.jpeg"
              alt="Brasil"
              pos="absolute"
              objectFit="cover"
              zIndex="hide"
              filter="brightness(0.7)"
            />
            <Center h="100%" flexDir="column">
              <Heading color="white" textShadow="lg">
                <Link href="/continent/brasil" passHref>
                  <LinkOverlay>América</LinkOverlay>
                </Link>
              </Heading>
              <Text color="whiteAlpha.800" fontWeight="bold" textShadow="lg">
                O continente da natureza.
              </Text>
            </Center>
          </LinkBox>
        </SwiperSlide>
      </Swiper>
    </Box>
  </>
);

export default Home;
