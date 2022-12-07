// this lander is from rotators/Lander.tsx

import * as React from 'react';
import { useState } from 'react';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';

import type { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDrawer } from '../slices/drawerSlice';
import nodeBFS from '../library/nodeBFS';
import { saveTree } from '../slices/treeSlice';
import { createStyles, Button } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => ({
  formikFields: {
    width: '100%',
  },

  formikField: {
    padding: '10px',
    borderRadius: '5px',
    width: '95%',
    height: '50px',
    border: 0,
  },

  fontAwesomeSubmitButton: {
    width: '100%',
    marginTop: '10px',
    textAlign: 'center',
    padding: '5px',
    background: '#228be6',
    height: '50px',
  },
}));

interface MyFormValues {
  landerRotatorName: string;
}

const FormLanderRotator: React.FC<{}> = () => {
  const dispatch = useDispatch();

  //accessing the redux store node
  const node = useSelector((state: RootState) => state.node);

  //accessing the redux store tree
  /*
     *** Why JSON.parse() is used
     Was not able to modify or mutate the tree hence tree is cloned
     https://stackoverflow.com/questions/74388436/array-push-typeerror-cannot-add-property-0-object-is-not-extensible/74406136#74406136
  */

  const tree = JSON.parse(
    JSON.stringify(useSelector((state: RootState) => state.tree.Tree))
  );

  const initialValues: MyFormValues = { landerRotatorName: '' };

  const { classes } = useStyles();

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          /* 
             *** TODOS
             Get the name of the current node clicked from the node redux store
             Get the current state of the tree from the tree store
             Get the name from the form
             Pass all the above values to nodeBFS. nodeBFS attaches the form details and returns a new tree
             Save the new tree in the redux tree store
          */
          actions.setSubmitting(false);
          dispatch(toggleDrawer());

          /* 
             *** What is nodeBFS
             nodeBFPS is a function which constructs the tree. 
             To nodeBFS you pass name of the exisiting node, then the existing tree and the value of the child which is filled in the form

          */

          const newTree = nodeBFS({
            tree: tree,
            clickedNodeName: node!.Node?.data?.name,            
            newNodeName: values.landerRotatorName,
            filters: { type: 'landerRotator' },
          });

          /*
            Once the tree is contructed, then the below function calls the redux dispatch
            To dispatch you pass the newly contructed tree from nodeBFS and it saves in the redux store
          */

          if (newTree) {
            dispatch(saveTree({ Tree: newTree }));
          }
        }}
      >
        <Form>
          <h1>Lander Rotator</h1>
          <div className={classes.formikFields}>
            <Field
              className={classes.formikField}
              id="landerRotatorName"
              name="landerRotatorName"
              placeholder={node.Node?.data?.name}
            />
          </div>
          <Button
            className={classes.fontAwesomeSubmitButton}
            disabled={
              node.Node?.children?.length !== undefined &&
              node.Node?.data?.attributes?.type === 'root' &&
              node.Node?.children?.length > 0
                ? true
                : false
            }
            type="submit"
          >
            Save
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormLanderRotator;
