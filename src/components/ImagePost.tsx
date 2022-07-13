import { Box, useColorModeValue, Text, Stack, Image, Avatar, Spacer, HStack, Icon } from '@chakra-ui/react';
import { Post, Comment } from '../models/Post';
import { ReactNode } from 'react';
import { TbThumbUp } from 'react-icons/tb';
import { ObjectId } from 'mongodb';
import { useAppSelector, useAppDispatch } from '../hooks/redux/hooks';
import { User } from '../models/User';
import { ObjectID } from 'bson';
import { likePost } from '../hooks/redux/actions/postActions';

//src={props.post.user.profilepicurl}

const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

interface postProps {
  post: Post;
}

interface boldProps {
  children: ReactNode;
}

export interface likeRequest {
  _userid: ObjectId;
  _postid: ObjectId;
}

function Bold(props: boldProps) {
  return <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>;
}

function ImagePost(props: postProps) {
  const thisPost = props.post;
  const { user }: { user: User } = useAppSelector((state) => state.currUserReducer);
  const dispatch = useAppDispatch();
  const ids: likeRequest = { _userid: user._id, _postid: thisPost._id };
  let postDay: string;
  let postTime: string;

  if (thisPost) {
    postDay = new Date(thisPost?.created_at).toLocaleDateString();
    postTime = new Date(thisPost?.created_at).toLocaleTimeString();
  }

  const tempDay = new Date().toLocaleDateString();
  const tempTime = new Date().toLocaleTimeString();

  function handleLike() {
    alert(ids);
    dispatch(likePost(ids));
  }

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
        <HStack p={2} w="full" roundedTop="lg" top="100%" bg={useColorModeValue('green', 'gray.700')}>
          <Box mr="10px">
            <Avatar size={'sm'} src={thisPost?.user.profilepicurl} />
          </Box>
          <Text noOfLines={1}> Zico Tjia </Text>
          <Spacer />
          <Box>
            <Bold> {tempDay}</Bold>
            <Text> {tempTime} </Text>
          </Box>
        </HStack>
        {thisPost && (
          <Box alignContent="center">
            <Image p={2} height="50vh" width="100vw" objectFit={'cover'} src={thisPost?.file} />
          </Box>
        )}
        <Stack p={2} align={'left'}>
          <HStack>
            <Icon as={TbThumbUp} onClick={handleLike} />
            <Text fontWeight="bold"> Likes {thisPost?.likes ? thisPost.likes.length : 0}</Text>
          </HStack>

          <Text color={'gray.500'} fontSize={'sm'}>
            <Bold>Brand</Bold> Hello Everyone this is where i will put the Comment
          </Text>
        </Stack>
      </Box>
    </>
  );
}

export default ImagePost;
