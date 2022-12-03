import * as React from "react";
import { Box, useColorModeValue, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Post } from "../models/Post";
import { useAppDispatch, useAppSelector } from "../hooks/redux/hooks";
import { getFile } from "../hooks/redux/actions/postActions";
import ImagePost from "../components/Post/ImagePost";
import { User } from "../models/User";

function MyPost() {
  const { user }: { user: User } = useAppSelector(
    (state) => state.currUserReducer
  );
  const { posts }: { posts: Post[] } = useAppSelector(
    (state) => state.postsReducer
  );

  var copy = posts;

  copy = copy.filter((post) => post.user._id === user._id);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFile());
  }, []);

  return (
    <>
      <Box
        ml={{ base: 0, md: 60 }}
        minH="100vh"
        bg={useColorModeValue("blue.100", "grey.900")}
        pt={2}
      >
        <VStack align="center" spacing={2}>
          {copy &&
            copy.map((post, index) => {
              return <ImagePost post={post} edittable={true} />;
            })}
        </VStack>
      </Box>
    </>
  );
}

export default MyPost;
