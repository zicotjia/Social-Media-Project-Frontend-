import React from 'react';
import { Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';

import SidebarContent from './SidebarContent';
import MobileNav from './MobileNav';

interface sidebarProps {
  isGuest: boolean;
}

export default function SidebarWithHeader({ isGuest }: sidebarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} isGuest={isGuest} />
    </>
  );
}
