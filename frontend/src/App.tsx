import React, { useState } from 'react';

import Tree from 'react-d3-tree';

import { RawNodeDatum, TreeNodeDatum } from 'react-d3-tree/lib/types/common';
import { HierarchyPointNode } from 'd3-hierarchy';
import DrawerRoot from './components/DrawerRoot';
import { Container } from '@mantine/core';

import type { RootState } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDrawer } from './slices/drawerSlice';
import tree, { saveTree } from './slices/treeSlice';
import node, { saveNode } from './slices/nodeSlice';
import {
  emailNode,
  emailRotator,
  landerNode,
  landerRotator,
  tokens,
} from './slices/AccordianSlice';

export default function App() {
  const dispatch = useDispatch();

  //accessing redux store - tree
  const tree = useSelector((state: RootState) => state.tree);

  const node = useSelector((state: RootState) => state.node);

  const accordian = useSelector((state: RootState) => state.accordian);

  const handleNodeClick = (datum: HierarchyPointNode<TreeNodeDatum>) => {
    /* 
       Call this function when a node is clicked
       Open Node Modal
       Open Rotator Modal
    */

    //when a node is clicked, save the current node information to redux store.
    dispatch(saveNode({ Node: datum }));

    //console.log("datum is", datum);
    dispatch(toggleDrawer());

    switch (true) {
      //show Rotator drawer if datum.data.attributes?.type is root

      case datum.data.attributes?.type === 'root':
        if (typeof datum?.children?.length != 'undefined') {
          if (datum.children!.length > 0) {
            dispatch(landerRotator(true));
            dispatch(landerNode(true));
            dispatch(tokens(false));
            dispatch(emailRotator(true));
            dispatch(emailNode(true));
          }
        } else {
          dispatch(landerRotator(false));
          dispatch(tokens(false));
          dispatch(landerNode(true));
          dispatch(emailRotator(true));
          dispatch(emailNode(true));
        }

        break;

      //show Lander Drawer if datum.data.attributes?.type is landerRotator
      case datum.data.attributes?.type == 'landerRotator':
        dispatch(landerRotator(true));
        dispatch(landerNode(false));
        dispatch(tokens(true));
        dispatch(emailRotator(true));
        dispatch(emailNode(true));
        break;

      case datum.data.attributes?.type == 'landerNode':
        if (typeof datum?.children?.length != 'undefined') {
          if (datum.children!.length > 0) {
            dispatch(landerRotator(true));
            dispatch(landerNode(true));
            dispatch(tokens(true));
            dispatch(emailRotator(true));
            dispatch(emailNode(true));
          }
        } else {
          dispatch(landerRotator(false));
          dispatch(emailRotator(false));
          dispatch(emailNode(false));
        }
        break;

      case datum.data.attributes?.type == 'emailRotator':
        break;

      case datum.data.attributes?.type == 'emailNode':
        break;
    }
  };

  return (
    <Container fluid style={{ height: '100vh', width: '100vw' }}>
      <Tree
        data={tree.Tree}
        collapsible={false}
        onNodeClick={handleNodeClick}
        translate={{ x: 200, y: 200 }}
        orientation="vertical"
        separation={{ nonSiblings: 3, siblings: 2.5 }}
      />
      {/* This Drawer opens Rotator and Tokens */}
      <DrawerRoot />

      {/* This Drawer opens when you click landerRotator */}
      {/* <DrawerLanderRotator /> */}
    </Container>
  );
}
