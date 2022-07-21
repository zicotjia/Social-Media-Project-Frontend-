import { Grid, GridItem } from '@chakra-ui/react';
import * as React from 'react';
import PersonCard from '../components/ProfileCard/PersonCard';
import PlainLayout from '../layout/PlainLayout';
import { useAppDispatch, useAppSelector } from '../hooks/redux/hooks';
import { useEffect } from 'react';
import { getUsers } from '../hooks/redux/actions/userActions';
import { User } from '../models/User';

function Following() {
  const dispatch = useAppDispatch();

  const { user }: { user: User } = useAppSelector((state) => state.currUserReducer);
  const { users }: { users: User[] } = useAppSelector((state) => state.usersReducer);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  var copy = users.slice();
  copy = copy.filter((otherUsers) => otherUsers._id !== user._id);

  var followingUsers: User[] = [];

  if (user.following) {
    followingUsers = copy.filter((otherUser) => user.following.includes(otherUser._id));
  }

  return (
    <PlainLayout>
      <Grid templateColumns="repeat(5, 1fr)" ml={3} gap={6}>
        {followingUsers &&
          followingUsers.map((user, index) => {
            return (
              <GridItem>
                <PersonCard user={user} followed={true} />
              </GridItem>
            );
          })}
      </Grid>
    </PlainLayout>
  );
}

export default Following;
