import {
  Box,
  Text,
  useColorModeValue,
  VStack,
  Spacer,
  Avatar,
  StackDivider,
  Textarea,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import { User } from '../../models/User';
import PlainLayout from '../../layout/PlainLayout';
import { HStack } from '@chakra-ui/react';
import ProfileModal from './ProfileModal';
import { useAppSelector } from '../../hooks/redux/hooks';
import ProfilePicModal from './ProfilePicModal';
import DeleteAlert from './DeleteAlert';

export interface AddPostValues {
  description: string;
  file: string;
  user: User;
}

function ProfilePage() {
  const { isOpen: isOpenProfileModal, onOpen: onOpenProfileModal, onClose: onCloseProfileModal } = useDisclosure();
  const {
    isOpen: isOpenProfilePicModal,
    onOpen: onOpenProfilePicModal,
    onClose: onCloseProfilePicModal,
  } = useDisclosure();
  const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure();

  const { user }: { user: User } = useAppSelector((state) => state.currUserReducer);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <PlainLayout>
        <VStack>
          <Box rounded={'lg'} minW="35vw" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
            <VStack
              divider={<StackDivider borderColor="gray.500" borderWidth="3px" />}
              w="100%"
              alignItems="start"
              spacing={12}
            >
              <HStack w="100%">
                <Box>
                  <HStack>
                    <Text fontWeight="700"> Username : </Text>
                    <Text fontWeight="300"> {user.username} </Text>
                  </HStack>
                </Box>
                <Spacer />
                <VStack>
                  <Avatar
                    size={'xl'}
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
                    src={user.profilepicurl}
                  />
                  <Text
                    onClick={onOpenProfilePicModal}
                    color="blue.300"
                    fontWeight="700"
                    _hover={{ textDecoration: 'underline', color: 'blue.500' }}
                  >
                    Edit Profile Picture
                  </Text>
                </VStack>
              </HStack>
              <HStack w="80%">
                <Box>
                  <HStack>
                    <Text fontWeight="700"> First Name : </Text>
                    <Text fontWeight="300"> {user.first_name} </Text>
                  </HStack>
                </Box>
                <Spacer />
                <Box>
                  <HStack>
                    <Text fontWeight="700"> Last Name : </Text>
                    <Text fontWeight="300"> {user.last_name} </Text>
                  </HStack>
                </Box>
              </HStack>
              <Box w="100%">
                <Text fontWeight="700">Bio</Text>
                <Textarea isDisabled mt={3} size="lg" value={user.bio}></Textarea>
              </Box>
            </VStack>
            <Flex flexDirection="row">
              <Text
                onClick={() => onOpenProfileModal()}
                color="blue.300"
                fontWeight="700"
                _hover={{ textDecoration: 'underline', color: 'blue.500' }}
              >
                Edit Profile
              </Text>
              <Spacer />
              <Text
                onClick={() => onOpenAlert()}
                color="red.300"
                fontWeight="700"
                _hover={{ textDecoration: 'underline', color: 'red' }}
              >
                Delete Profile
              </Text>
              <DeleteAlert isOpen={isOpenAlert} onClose={onCloseAlert} />
            </Flex>
          </Box>
        </VStack>
      </PlainLayout>
      <ProfileModal
        isOpen={isOpenProfileModal}
        onClose={onCloseProfileModal}
        initialRef={initialRef}
        finalRef={finalRef}
      />
      <ProfilePicModal isOpen={isOpenProfilePicModal} onClose={onCloseProfilePicModal} />
    </>
  );
}

export default ProfilePage;
