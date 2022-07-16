import { Heading, Avatar, Box, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { User } from '../models/User';

interface PersonCardProps {
  user: User;
}

function PersonCard({ user }: PersonCardProps) {
  return (
    <Box
      maxW={'220px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}
    >
      <Avatar
        size={'xl'}
        mb={4}
        pos={'relative'}
        _after={{
          content: '""',
          w: 4,
          h: 4,
          bg: 'green.300',
          border: '2px solid white',
          rounded: 'full',
          pos: 'absolute',
          bottom: 0,
          right: 3,
        }}
      />
      <Heading fontSize={'2xl'} fontFamily={'body'}>
        {user.first_name} {user.last_name}
      </Heading>
      <Text fontWeight={600} color={'gray.500'} mb={4}>
        {user.username}
      </Text>
      <Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} px={3}>
        {user.bio}
      </Text>

      <Button
        flex={1}
        fontSize={'sm'}
        rounded={'full'}
        bg={'blue.400'}
        color={'white'}
        mt={8}
        boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
        _hover={{
          bg: 'blue.500',
        }}
        _focus={{
          bg: 'blue.500',
        }}
      >
        Follow
      </Button>
    </Box>
  );
}

export default PersonCard;
