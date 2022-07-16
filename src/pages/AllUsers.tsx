import { Grid, GridItem } from '@chakra-ui/react';
import * as React from 'react';
import PersonCard from '../components/PersonCard';
import PlainLayout from '../layout/PlainLayout';
import { useAppDispatch, useAppSelector } from '../hooks/redux/hooks';
import { useEffect } from 'react';
import { getUsers } from '../hooks/redux/actions/userActions';
import { User } from '../models/User';

export interface IAppProps {}

function AllUsers(props: IAppProps) {
  const dispatch = useAppDispatch();

  const { users }: { users: User[] } = useAppSelector((state) => state.usersReducer);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <PlainLayout>
      <Grid templateColumns="repeat(5, 1fr)" ml={3} gap={6}>
        {users &&
          users.map((user, index) => {
            return (
              <GridItem>
                <PersonCard user={user} />
              </GridItem>
            );
          })}
      </Grid>
    </PlainLayout>
  );
}

export default AllUsers;
