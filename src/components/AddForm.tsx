import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Field, Form, Formik, FormikProps, FormikValues } from 'formik';
import React from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux/hooks';
import { User } from '../models/User';
import { uploadFile } from '../hooks/redux/actions/postActions';
import PlainLayout from '../layout/PlainLayout';

export interface AddPostValues {
  description: string;
  file: string;
  user: User;
}

export function AddForm() {
  const [imageFile, setImageFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const { user }: { user: User } = useAppSelector((state) => state.currUserReducer);

  const dispatch = useAppDispatch();

  const initialValues: AddPostValues = { description: '', file: '', user: user };
  const filePicker = React.useRef<HTMLInputElement>(null);
  const formikRef = React.useRef<FormikProps<AddPostValues>>(null);

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
      formikRef.current?.setFieldValue('file', fileReader.result);
    };
    fileReader.readAsDataURL(imageFile);
  }, [imageFile]);

  function handleFileInput(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;
    const file: File = target.files[0];
    setImageFile(file);
  }

  async function handleSubmit(values: AddPostValues) {
    console.log(values);

    await dispatch(uploadFile(values));
  }

  return (
    <PlainLayout>
      <VStack>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Add your Post
          </Heading>
        </Stack>
        <Box rounded={'lg'} minW="35vw" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            onSubmit={(values: AddPostValues, action) => {
              alert(JSON.stringify(values, null, 2));
              handleSubmit(values);
            }}
            validateOnChange={false}
          >
            <Form noValidate>
              <Stack>
                <Field name="description">
                  {({ field, form }: { field: AddPostValues; form: FormikValues }) => (
                    <FormControl id="description" isRequired>
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
                    <FormControl id="file" isRequired>
                      <Stack spacing="3">
                        <FormLabel>Upload image</FormLabel>
                        {previewUrl && <img src={previewUrl} alt="Noimage" />}
                        {!previewUrl && <p>Image will be previewed here</p>}
                        <Box
                          borderColor="red"
                          boxShadow={'lg'}
                          bg="gray.500"
                          width="30%"
                          textAlign="center"
                          rounded="md"
                          onClick={() => refClick()}
                        >
                          Submit
                        </Box>
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
                <Button
                  flex={1}
                  fontSize={'sm'}
                  rounded={'full'}
                  bg={'blue.400'}
                  color={'white'}
                  mt={8}
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
                <Button>Follow</Button>
              </Stack>
            </Form>
          </Formik>
        </Box>
      </VStack>
    </PlainLayout>
  );
}
