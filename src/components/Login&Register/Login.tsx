import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field, Form, Formik, FormikValues } from 'formik';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../hooks/redux/actions/userActions';
import { useAppDispatch } from '../../hooks/redux/hooks';
import { validateEmail, validatePassword } from '../../validator/validator';

export interface LoginFormValues {
  email: string;
  password: string;
}

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function loginHandler(values: LoginFormValues) {
    console.log(values);

    await dispatch(userLogin(values));

    navigate('/');
  }

  const initialValues: LoginFormValues = { email: '', password: '' };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <Formik
            initialValues={initialValues}
            onSubmit={(values: LoginFormValues, action) => {
              loginHandler(values);
            }}
            validateOnChange={false}
          >
            <Form>
              <Field name="email" validate={validateEmail}>
                {({ field, form }: { field: LoginFormValues; form: FormikValues }) => (
                  <FormControl isRequired id="email" isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel>Email address</FormLabel>
                    <Input {...field} type="email" />
                    <FormErrorMessage> {form.errors.email} </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password" validate={validatePassword}>
                {({ field, form }: { field: LoginFormValues; form: FormikValues }) => (
                  <FormControl isRequired id="password" isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel>Password</FormLabel>
                    <Input {...field} type="password" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Stack spacing={7}>
                <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                  <Link href="/register" color={'blue.500'}>
                    Click here to make an Account
                  </Link>
                  <Link href="/guest" color={'blue.500'}>
                    Enter with a Guest Account
                  </Link>
                </Stack>
                <Button colorScheme={'blue'} variant={'solid'} type="submit">
                  Sign in
                </Button>
              </Stack>
            </Form>
          </Formik>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  );
}

export default Login;
