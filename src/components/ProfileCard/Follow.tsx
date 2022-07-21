import { Button, HStack, useToast } from '@chakra-ui/react';
import React from 'react';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks';
import { ObjectId } from 'mongodb';
import { User } from '../../models/User';
import { followUser, unFollowUser } from '../../hooks/redux/actions/userActions';

interface FollowProps {
  followed: boolean;
  _userid: ObjectId;
}

export interface FollowRequest {
  follower: ObjectId;
  following: ObjectId;
}

function Follow(props: FollowProps) {
  const [followed, setFollowed] = useState<boolean>(props.followed);

  const { user }: { user: User } = useAppSelector((state) => state.currUserReducer);

  const dispatch = useAppDispatch();
  const ids: FollowRequest = { follower: user._id, following: props._userid };

  const toast = useToast();

  async function onClickHandler() {
    if (!followed) {
      dispatch(followUser(ids));
      toast({
        title: 'User Followed',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } else {
      dispatch(unFollowUser(ids));
      toast({
        title: 'User Unfollowed',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
    }
    setFollowed(!followed);
  }

  // Update the stored user with the updated user after dispatch
  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <HStack>
      <Button
        flex={1}
        fontSize={'sm'}
        rounded={'full'}
        bg={'blue.400'}
        color={'white'}
        boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
        _hover={{
          bg: 'blue.500',
        }}
        _focus={{
          bg: 'blue.500',
        }}
        isActive={followed}
        _active={{ bg: 'red.400' }}
        onClick={() => onClickHandler()}
      >
        {followed ? 'Unfollow' : 'Follow'}
      </Button>
    </HStack>
  );
}

export default Follow;
