import React from 'react';
import { Box, CloseButton, Flex, Icon, useColorModeValue, Link, Text, BoxProps, FlexProps } from '@chakra-ui/react';
import { FiHome } from 'react-icons/fi';
import { MdAddBox, MdOutlinePeopleAlt, MdPeople, MdPeopleOutline } from 'react-icons/md';
import { IconType } from 'react-icons';
import { CgProfile } from 'react-icons/cg';
import { RiPagesLine } from 'react-icons/ri';
import { ReactText } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks';
import { newPage } from '../../hooks/redux/actions/pageActions';

interface LinkItemProps {
  name: string;
  url: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', url: '/', icon: FiHome },
  { name: 'Add Post', url: '/addpost', icon: MdAddBox },
  { name: 'Profile', url: '/profile', icon: CgProfile },
  { name: 'All Users', url: '/people', icon: MdOutlinePeopleAlt },
  { name: 'Follower', url: '/follower', icon: MdPeople },
  { name: 'Following', url: '/following', icon: MdPeopleOutline },
  { name: 'My Post', url: '/mypage', icon: RiPagesLine },
];

const GuestItems: Array<LinkItemProps> = [{ name: 'Home', url: '/', icon: FiHome }];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

function SidebarContent({ onClose, ...rest }: SidebarProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { page }: { page: string } = useAppSelector((state) => state.pageReducer);

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('gray.100', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          {page}
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          onClick={() => {
            navigate(link.url);
            dispatch(newPage(link.name));
          }}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}

function NavItem({ icon, children, ...rest }: NavItemProps) {
  return (
    <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
}

export default SidebarContent;
