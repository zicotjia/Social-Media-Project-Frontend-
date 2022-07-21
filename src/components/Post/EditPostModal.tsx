import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { Field, Form, Formik, FormikProps, FormikValues } from 'formik';
import React from 'react';
import { useAppDispatch } from '../../hooks/redux/hooks';
import { ObjectId } from 'mongodb';
import { editPost } from '../../hooks/redux/actions/postActions';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRef: React.MutableRefObject<null>;
  finalRef: React.MutableRefObject<null>;
  postId: ObjectId;
}

export interface PostChangeFormValues {
  postid: ObjectId;
  description: string | null;
}

function EditPostModal({ isOpen, onClose, initialRef, finalRef, postId }: ModalProps) {
  const formRef = React.useRef<FormikProps<PostChangeFormValues>>(null);

  const initialValues: PostChangeFormValues = {
    postid: postId,
    description: null,
  };

  const dispatch = useAppDispatch();

  function handleSubmit(values: PostChangeFormValues) {
    if (values.description) {
      dispatch(editPost(values));
    }
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Post Description</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values: PostChangeFormValues, action) => {
              handleSubmit(values);
              onClose();
            }}
            validateOnChange={true}
            innerRef={formRef}
          >
            <Form>
              <Box>
                <Stack spacing={4}>
                  <Box>
                    <Field name="description">
                      {({ field, form }: { field: PostChangeFormValues; form: FormikValues }) => (
                        <FormControl id="description">
                          <FormLabel>Description</FormLabel>
                          <Textarea {...field} size="md" />
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                </Stack>
              </Box>
            </Form>
          </Formik>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              if (formRef.current) formRef.current.handleSubmit();
            }}
            colorScheme="blue"
            mr={3}
          >
            Edit Post
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditPostModal;
