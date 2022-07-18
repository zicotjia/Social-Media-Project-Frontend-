import * as React from 'react';
import { Box, useColorModeValue, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../hooks/redux/store';
import { useEffect } from 'react';
import { Post } from '../models/Post';
import { useAppDispatch } from '../hooks/redux/hooks';
import { getFile } from '../hooks/redux/actions/postActions';
import ImagePost from '../components/ImagePost';

function Home() {
  const { posts }: { posts: Post[] } = useSelector((state: RootState) => state.postsReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFile());
  }, []);

  return (
    <>
      <Box ml={{ base: 0, md: 60 }} minH="100vh" bg={useColorModeValue('blue.100', 'grey.900')} pt={2}>
        <VStack align="center" spacing={2}>
          {posts &&
            posts.map((post, index) => {
              return <ImagePost post={post} />;
            })}
        </VStack>
      </Box>
    </>
  );
}

export default Home;
