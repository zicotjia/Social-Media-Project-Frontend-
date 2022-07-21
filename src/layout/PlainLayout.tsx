import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

export interface Props {
  children: React.ReactNode;
}

function PlainLayout(props: Props) {
  return (
    <Box ml={{ base: 0, md: 60 }} minH="100vh" bg={useColorModeValue('blue.100', 'grey.900')} pt={2}>
      {props.children}
    </Box>
  );
}

export default PlainLayout;
