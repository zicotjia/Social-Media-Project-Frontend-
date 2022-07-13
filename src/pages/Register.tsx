import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useAppDispatch } from '../hooks/redux/hooks';
import { userRegister } from '../hooks/redux/actions/userActions';
import { Field, Form, Formik, FormikValues } from 'formik';
import { validateEmail, validateName, validatePassword, validateUsername } from '../validator/validator';

export interface registerFormValues {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  const initialValues: registerFormValues = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
  };

  function registerHandler(values: registerFormValues) {
    console.log(values);
    try {
      dispatch(userRegister(values));
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'right'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Formik
          initialValues={initialValues}
          onSubmit={(values: registerFormValues, action) => {
            registerHandler(values);
          }}
          validateOnChange={false}
        >
          <Form>
            <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <Field name="first_name" validate={validateName}>
                      {({ field, form }: { field: registerFormValues; form: FormikValues }) => (
                        <FormControl
                          id="first_Name"
                          isRequired
                          isInvalid={form.errors.first_name && form.touched.first_name}
                        >
                          <FormLabel>First Name</FormLabel>
                          <Input {...field} type="text" />
                          <FormErrorMessage>{form.errors.first_name}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box>
                    <Field name="last_name" validate={validateName}>
                      {({ field, form }: { field: registerFormValues; form: FormikValues }) => (
                        <FormControl
                          id="last_Name"
                          isRequired
                          isInvalid={form.errors.last_name && form.touched.last_name}
                        >
                          <FormLabel>Last Name</FormLabel>
                          <Input {...field} type="text" />
                          <FormErrorMessage>{form.errors.last_name}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                </HStack>
                <Field name="username" validate={validateUsername}>
                  {({ field, form }: { field: registerFormValues; form: FormikValues }) => (
                    <FormControl id="username" isRequired isInvalid={form.errors.username && form.touched.username}>
                      <FormLabel>Username</FormLabel>
                      <Input {...field} type="text" />
                      <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="email" validate={validateEmail}>
                  {({ field, form }: { field: registerFormValues; form: FormikValues }) => (
                    <FormControl id="email" isRequired isInvalid={form.errors.email && form.touched.email}>
                      <FormLabel>Email address</FormLabel>
                      <Input {...field} type="email" />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password" validate={validatePassword}>
                  {({ field, form }: { field: registerFormValues; form: FormikValues }) => (
                    <FormControl id="password" isRequired isInvalid={form.errors.password && form.touched.password}>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input {...field} type={showPassword ? 'text' : 'password'} />
                        <InputRightElement h={'full'}>
                          <Button variant={'ghost'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    type="submit"
                  >
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={'center'}>
                    Already a user?{' '}
                    <Link href="http://localhost:3000/login" color={'blue.400'}>
                      Login
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Form>
        </Formik>
      </Stack>
    </Flex>
  );
}

export default Register;
