import * as React from 'react';
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

import nodeBFS from '../library/nodeBFS';
import { saveTree } from '../slices/treeSlice';
import { createStyles, Button } from '@mantine/core';
import { toggleDrawer } from '../slices/drawerSlice';

const useStyles = createStyles((theme, _params, getRef) => ({
  formikFields: {
    width: '100%',
  },

  formikField: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    width: '95%',
    height: '50px',
    border: 0,
  },

  formikFieldTextArea: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    width: '95%',
    height: '190px',
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
  emailNodeName: string;
}

const FormEmailNode: React.FC<{}> = () => {
  const dispatch = useDispatch();

  // accessing redux store drawerSlice
  const isOpen = useSelector((state: RootState) => state.drawer.isOpen);

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

  const initialValues: MyFormValues = { emailNodeName: '' };

  const { classes } = useStyles();

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          dispatch(toggleDrawer());
          /* 
             *** What is nodeBFS
             nodeBFPS is a function which constructs the tree. 
             To nodeBFS you pass name of the exisiting node, then the existing tree and the value of the child which is filled in the form

          */

          const newTree = nodeBFS({
            tree: tree,
            clickedNodeName: node!.Node.data.name,
            newNodeName: values.emailNodeName,
            filters: {
              type: 'emailNode',
            },
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
          <div className={classes.formikFields}>
            <Field
              className={classes.formikField}
              id="emailNodeName"
              name="emailNodeName"
              placeholder="Email Node Name"
            />

            <Field
              className={classes.formikField}
              id="emailNodeSubject"
              name="emailNodeSubject"
              placeholder="Email Subject"
            />

            <Field
              component="textarea"
              className={classes.formikFieldTextArea}
              id="emailNodeSubject"
              name="emailNodeSubject"
              placeholder="Email Subject"
            />
          </div>
          <Button
            className={classes.fontAwesomeSubmitButton}
            disabled={
              node.Node?.data?.attributes?.type === 'root' ? true : false
            }
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormEmailNode;
