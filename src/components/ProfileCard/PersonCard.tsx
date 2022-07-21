import { Heading, Avatar, Box, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { useAppSelector } from '../../hooks/redux/hooks';
import { User } from '../../models/User';
import Follow, { StaticFollow } from './Follow';

interface PersonCardProps {
  otherUser: User;
  followed: boolean;
}

function PersonCard({ otherUser, followed }: PersonCardProps) {
  const { user }: { user: User } = useAppSelector((state) => state.currUserReducer);

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
          src={otherUser.profilepicurl}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {otherUser.first_name} {otherUser.last_name}
        </Heading>
        <Box h="120px" w="full">
          <Text noOfLines={3}>{otherUser.bio}</Text>
        </Box>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {otherUser.username}
        </Text>
        {user ? <Follow followed={followed} _userid={otherUser._id} /> : <StaticFollow />}
      </VStack>
    </Box>
  );
}

export default PersonCard;
