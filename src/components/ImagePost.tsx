import { Box, useColorModeValue, Text, Stack, Image, Avatar, Spacer, HStack } from '@chakra-ui/react';
import { Post } from '../models/Post';
import { ReactNode } from 'react';
import { useAppSelector } from '../hooks/redux/hooks';
import { User } from '../models/User';
import Like from './Like';

//src={props.post.user.profilepicurl}

interface PostProps {
  post: Post;
}

interface BoldProps {
  children: ReactNode;
}

function Bold(props: BoldProps) {
  return <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>;
}

function ImagePost({ post }: PostProps) {
  const { user }: { user: User } = useAppSelector((state) => state.currUserReducer);

  let postDay: string;
  let postTime: string;

  var liked = false;

  if (post.likes) {
    for (var i = 0; i < post.likes.length; i++) {
      if (post.likes[i].userid === user._id) {
        liked = true;
        break;
      }
    }
  }

  postDay = new Date(post?.created_at).toLocaleDateString();
  postTime = new Date(post?.created_at).toLocaleTimeString();

  return (
    <>
      <Box
        role={'group'}
        p={0}
        maxW={'500px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <HStack p={2} w="full" roundedTop="lg" top="100%" bg={useColorModeValue('blue.300', 'gray.700')}>
          <Box mr="10px">
            <Avatar size={'sm'} src={post.user.profilepicurl} />
          </Box>
          <Text noOfLines={1}> {post.user.username} </Text>
          <Spacer />
          <Box>
            <Bold> {postDay}</Bold>
            <Text> {postTime} </Text>
          </Box>
        </HStack>
        <Box alignContent="center">
          <Image p={2} height="60vh" width="100vw" objectFit={'cover'} src={post.file} />
        </Box>
        <Stack p={2} align={'left'} bg={useColorModeValue('gray.100', 'gray.700')} roundedBottom="lg">
          <Like liked={liked} noOfLikes={post.likes ? post.likes.length : 0} _userid={user._id} _postid={post._id} />
          <Text color={'gray.500'} fontSize={'sm'}>
            <Bold>{post.user.username}</Bold> {post.description}
          </Text>
        </Stack>
      </Box>
    </>
  );
}

export default ImagePost;
