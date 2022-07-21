import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Image,
  Stack,
  Textarea,
  useColorModeValue,
  VStack,
  Center,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field, Form, Formik, FormikProps, FormikValues } from 'formik';
import React from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks';
import { User } from '../../models/User';
import { uploadFile } from '../../hooks/redux/actions/postActions';
import PlainLayout from '../../layout/PlainLayout';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

export interface AddPostValues {
  description: string | null;
  file: string;
  user: User;
}

export function AddForm() {
  const [imageFile, setImageFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [error, setError] = useState<boolean>(false);

  const { user }: { user: User } = useAppSelector((state) => state.currUserReducer);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toast = useToast();

  const initialValues: AddPostValues = { description: '', file: '', user: user };
  const filePicker = React.useRef<HTMLInputElement>(null);
  const formikRef = React.useRef<FormikProps<AddPostValues>>(null);

  function refClick() {
    if (filePicker.current) {
      filePicker.current.click();
    }
  }

  useEffect(() => {
    setError(false);
    if (!imageFile) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
      formikRef.current?.setFieldValue('file', fileReader.result);
    };
    fileReader.readAsDataURL(imageFile);
  }, [imageFile]);

  function handleFileInput(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    if (!target.files) {
      return;
    }
    const file: File = target.files[0];
    setImageFile(file);
  }

  async function handleSubmit(values: AddPostValues) {
    if (values.file === '') {
      setError(true);
      return;
    }
    console.log(values);
    await dispatch(uploadFile(values));

    toast({
      title: 'Post has been added',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    navigate('/');
  }

  return (
    <PlainLayout>
      <VStack>
        <Box rounded={'lg'} minW="35vw" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            onSubmit={(values: AddPostValues, action) => {
              handleSubmit(values);
            }}
          >
            <Form>
              <Stack>
                <Field name="description">
                  {({ field, form }: { field: AddPostValues; form: FormikValues }) => (
                    <FormControl id="description">
                      <FormLabel>Description</FormLabel>
                      <Textarea {...field} size="lg" />
                    </FormControl>
                  )}
                </Field>
                <Field name="file">
                  {({
                    field,
                    form,
                    setFieldValue,
                  }: {
                    field: AddPostValues;
                    form: FormikValues;
                    setFieldValue: any;
                  }) => (
                    <FormControl id="file" isInvalid={error}>
                      <Stack spacing="3">
                        <FormLabel>Upload image</FormLabel>
                        <FormErrorMessage> Image is Required </FormErrorMessage>
                        {previewUrl && <Image p={2} height="40vh" width="30vw" objectFit={'cover'} src={previewUrl} />}
                        {!previewUrl && <p>Image will be previewed here</p>}
                        <Button
                          flex={1}
                          fontSize={'xl'}
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
                <Center>
                  <Button
                    flex={1}
                    fontSize={'xl'}
                    bg={'blue.400'}
                    color={'white'}
                    boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    _focus={{
                      bg: 'blue.500',
                    }}
                    type="submit"
                  >
                    Add Post
                  </Button>
                </Center>
              </Stack>
            </Form>
          </Formik>
        </Box>
      </VStack>
    </PlainLayout>
  );
}
