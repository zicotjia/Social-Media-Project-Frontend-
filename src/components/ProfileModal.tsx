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
import { useAppDispatch, useAppSelector } from '../hooks/redux/hooks';
import { ObjectId } from 'mongodb';
import { User } from '../models/User';
import { editUserProfile } from '../hooks/redux/actions/userActions';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRef: React.MutableRefObject<null>;
  finalRef: React.MutableRefObject<null>;
}

export interface ProfileChangeFormValues {
  user_id: ObjectId;
  bio: string | null;
}

function ProfileModal({ isOpen, onClose, initialRef, finalRef }: ModalProps) {
  const formRef = React.useRef<FormikProps<ProfileChangeFormValues>>(null);

  const { user }: { user: User } = useAppSelector((state) => state.currUserReducer);

  const initialValues: ProfileChangeFormValues = {
    user_id: user._id,
    bio: null,
  };

  const dispatch = useAppDispatch();

  function handleSubmit(values: ProfileChangeFormValues) {
    if (values.bio) {
      dispatch(editUserProfile(values));
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
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values: ProfileChangeFormValues, action) => {
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
                    <Field name="bio">
                      {({ field, form }: { field: ProfileChangeFormValues; form: FormikValues }) => (
                        <FormControl id="bio">
                          <FormLabel>Bio</FormLabel>
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
            Edit Profile
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ProfileModal;
