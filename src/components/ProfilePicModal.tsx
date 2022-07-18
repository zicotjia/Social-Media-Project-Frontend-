import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
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
import { ObjectId } from 'mongodb';
import React, { useEffect, useState } from 'react';
import { editUserProfile, editProfilePicture } from '../hooks/redux/actions/userActions';
import { useAppDispatch, useAppSelector } from '../hooks/redux/hooks';
import { User } from '../models/User';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ProfilePicChangeFormValues {
  user_id: ObjectId;
  url: string;
}

function ProfilePicModal({ isOpen, onClose }: ModalProps) {
  const [imageFile, setImageFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string>();

  const { user }: { user: User } = useAppSelector((state) => state.currUserReducer);

  const dispatch = useAppDispatch();

  const initialValues: ProfilePicChangeFormValues = { user_id: user._id, url: '' };
  const filePicker = React.useRef<HTMLInputElement>(null);
  const formikRef = React.useRef<FormikProps<ProfilePicChangeFormValues>>(null);

  function refClick() {
    if (filePicker.current) {
      filePicker.current.click();
    }
  }

  useEffect(() => {
    if (!imageFile) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
      formikRef.current?.setFieldValue('profilepicurl', fileReader.result);
    };
    fileReader.readAsDataURL(imageFile);
  }, [imageFile]);

  function handleFileInput(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;
    const file: File = target.files[0];
    setImageFile(file);
  }

  async function handleSubmit(values: ProfilePicChangeFormValues) {
    dispatch(editProfilePicture(values));
    console.log(values);
  }

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile Pic</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            onSubmit={(values: ProfilePicChangeFormValues, action) => {
              handleSubmit(values);
              onClose();
            }}
            validateOnChange={true}
            validateOnBlur={true}
          >
            <Form>
              <Stack>
                <Field name="profilepicurl">
                  {({
                    field,
                    form,
                    setFieldValue,
                  }: {
                    field: ProfilePicChangeFormValues;
                    form: FormikValues;
                    setFieldValue: any;
                  }) => (
                    <FormControl id="profilepicurl" isRequired>
                      <Stack spacing="3">
                        <FormLabel>Upload image</FormLabel>
                        {previewUrl && (
                          <Avatar
                            size={'xl'}
                            src={previewUrl}
                            mb={4}
                            pos={'relative'}
                            _after={{
                              content: '""',
                              w: 4,
                              h: 4,
                              bg: 'green.300',
                              border: '2px solid white',
                              rounded: 'full',
                              pos: 'absolute',
                              bottom: 0,
                              right: 3,
                            }}
                          />
                        )}

                        {!previewUrl && <p>Image will be previewed here</p>}
                        <Button
                          flex={1}
                          fontSize={'md'}
                          width="30%"
                          bg={'gray.400'}
                          color={'white'}
                          boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                          _hover={{
                            bg: 'blue.500',
                          }}
                          _focus={{
                            bg: 'blue.500',
                          }}
                          onClick={() => refClick()}
                        >
                          Submit Picture
                        </Button>
                        <Input
                          {...field}
                          value={undefined}
                          type="file"
                          display="none"
                          title=" "
                          accept=".jpg,.png,.jpeg"
                          ref={filePicker}
                          onChange={handleFileInput}
                        />
                      </Stack>
                    </FormControl>
                  )}
                </Field>
              </Stack>
            </Form>
          </Formik>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              if (formikRef.current) formikRef.current.handleSubmit();
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

export default ProfilePicModal;
