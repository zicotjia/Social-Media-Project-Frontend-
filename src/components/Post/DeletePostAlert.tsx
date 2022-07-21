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
import { useAppDispatch } from '../../hooks/redux/hooks';
import { ObjectId } from 'mongodb';
import { deletePost } from '../../hooks/redux/actions/postActions';

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  postId: ObjectId;
}

function DeletePostAlert({ isOpen, onClose, postId }: AlertProps) {
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(deletePost(postId));
    onClose();
  }

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Post
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

export default DeletePostAlert;
