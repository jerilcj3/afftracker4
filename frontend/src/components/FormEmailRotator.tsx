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
  emailRotatorName: string;
}

const FormEmailRotator: React.FC<{}> = () => {
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

  const initialValues: MyFormValues = { emailRotatorName: '' };

  const { classes } = useStyles();

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <div className={classes.formikFields}>
            <Field
              className={classes.formikField}
              id="emailRotatorName"
              name="emailRotatorName"
              placeholder="First Name"
            />
          </div>
          <Button
            className={classes.fontAwesomeSubmitButton}
            disabled={node.Node?.data?.attributes?.type === 'root' ? true : false}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormEmailRotator;
