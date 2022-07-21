import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { deleteUser } from '../../hooks/redux/actions/userActions';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks';
import { User } from '../../models/User';

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
}

function DeleteAlert({ isOpen, onClose }: AlertProps) {
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const { user }: { user: User } = useAppSelector((state) => state.currUserReducer);

  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(deleteUser(user._id));
    onClose();
  }

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Account
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => onClose()}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => handleDelete()} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default DeleteAlert;
