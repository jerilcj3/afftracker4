import React from 'react';
import { useState } from 'react';

import { Drawer, Button, Group } from '@mantine/core';
import AccordianRoot from './AccordianRoot';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDrawer } from '../slices/drawerSlice';

/* interface DrawerRotatorProps {
  isOpen: boolean;
  onClose: () => void;
} */

const DrawerRoot: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.drawer.isOpen);
  const dispatch = useDispatch();

  return (
    <>
      {' '}
      <Drawer
        opened={isOpen}
        onClose={() => dispatch(toggleDrawer())}
        title="Create Campaign"
        padding="xl"
        size="20%"
      >
        <AccordianRoot />
      </Drawer>
    </>
  );
};

export default DrawerRoot;
