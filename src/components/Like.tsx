import { HStack, IconButton } from '@chakra-ui/react';
import React from 'react';
import { TbThumbUp } from 'react-icons/tb';
import { Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux/hooks';
import { ObjectId } from 'mongodb';
import { likePost, unLikePost } from '../hooks/redux/actions/postActions';
import { User } from '../models/User';

interface likeProps {
  liked: boolean;
  noOfLikes: number;
  _userid: ObjectId;
  _postid: ObjectId;
}

export interface likeRequest {
  _userid: ObjectId;
  username: string;
  _postid: ObjectId;
}

function Like(props: likeProps) {
  const [liked, setLiked] = useState<boolean>(props.liked);
  const [noOfLikes, setnoOfLikes] = useState<number>(props.noOfLikes);

  const { user }: { user: User } = useAppSelector((state) => state.currUserReducer);

  const dispatch = useAppDispatch();
  const ids: likeRequest = { _userid: props._userid, username: user.username, _postid: props._postid };

  function onClickHandler() {
    alert(ids);
    if (!liked) {
      alert('liked');
      dispatch(likePost(ids));
      setnoOfLikes(noOfLikes + 1);
    } else {
      alert('unliked');
      dispatch(unLikePost(ids));
      setnoOfLikes(noOfLikes - 1);
      //dispatch(unLikePost(ids));
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