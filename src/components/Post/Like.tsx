import { HStack, IconButton, useToast } from '@chakra-ui/react';
import React from 'react';
import { TbThumbUp } from 'react-icons/tb';
import { Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks';
import { ObjectId } from 'mongodb';
import { likePost, unLikePost } from '../../hooks/redux/actions/postActions';
import { User } from '../../models/User';

interface LikeProps {
  liked: boolean;
  noOfLikes: number;
  _userid: ObjectId;
  _postid: ObjectId;
}

export interface LikeRequest {
  _userid: ObjectId;
  username: string;
  _postid: ObjectId;
}

function Like(props: LikeProps) {
  const [liked, setLiked] = useState<boolean>(props.liked);
  const [noOfLikes, setnoOfLikes] = useState<number>(props.noOfLikes);

  const { user }: { user: User } = useAppSelector((state) => state.currUserReducer);
  const dispatch = useAppDispatch();

  const toast = useToast();

  const ids: LikeRequest = { _userid: props._userid, username: user.username, _postid: props._postid };

  function onClickHandler() {
    if (!liked) {
      dispatch(likePost(ids));
      setnoOfLikes(noOfLikes + 1);
      toast({
        title: 'Post Liked',
        description: user.username + ' will appreciate this',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } else {
      dispatch(unLikePost(ids));
      setnoOfLikes(noOfLikes - 1);
      toast({
        title: 'Post Unliked',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
    }
    setLiked(!liked);
  }

  return (
    <HStack>
      <IconButton
        aria-label="Like"
        icon={<TbThumbUp />}
        onClick={() => onClickHandler()}
        _active={{ color: 'red' }}
        isActive={liked}
      />
      <Text fontWeight="bold"> Likes {noOfLikes}</Text>
    </HStack>
  );
}

export default Like;
