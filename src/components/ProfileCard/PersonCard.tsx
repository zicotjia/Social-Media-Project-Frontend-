import { Heading, Avatar, Box, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { User } from '../../models/User';
import Follow from './Follow';

interface PersonCardProps {
  user: User;
  followed: boolean;
}

function PersonCard({ user, followed }: PersonCardProps) {
  return (
    <Box
      maxW="220px"
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}
    >
      <VStack maxH="300px">
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
          src={user.profilepicurl}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {user.first_name} {user.last_name}
        </Heading>
        <Box h="120px" w="full">
          <Text noOfLines={3}>{user.bio}</Text>
        </Box>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {user.username}
        </Text>
        <Follow followed={followed} _userid={user._id} />
      </VStack>
    </Box>
  );
}

export default PersonCard;
