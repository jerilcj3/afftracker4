import * as React from 'react';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldArray,
  FieldProps,
} from 'formik';

import type { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDrawer } from '../slices/drawerSlice';
import { Flex, Button, Input, ScrollArea } from '@mantine/core';
import { createStyles } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import nodeBFS from '../library/nodeBFS';
import { saveTokens } from '../slices/tokenSlice';

const useStyles = createStyles((theme, _params, getRef) => ({
  formikForm: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  formikFields: {
    width: '80%',
  },

  formikField: {
    padding: '10px',
    margin: '10px 5px',
    borderRadius: '5px',
    width: '24%',
    height: '20px',
    border: 0,
  },

  formikButtonGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },

  formikButton: {
    margin: '5px',
  },

  fontAwesomeIcon: {
    margin: '5px',
    cursor: 'pointer',
    border: '2px solid black',
    padding: '3px',
    background: 'lightBlue',
  },

  fontAwesomeSubmitButton: {
    width: '100%',
    marginTop: '10px',
    textAlign: 'center',
    height: '50px',
  },
}));

/* interface MyFormValues {
  name: string;
  placeholder: string;
  value: string;
} */

const FormToken: React.FC<{}> = () => {
  const dispatch = useDispatch();

  // accessing redux store
  const isOpen = useSelector((state: RootState) => state.drawer.isOpen);

  //accessing the redux store tree
  /*
     *** Why JSON.parse() is used
     Was not able to modify or mutate the tree hence tree is cloned
     https://stackoverflow.com/questions/74388436/array-push-typeerror-cannot-add-property-0-object-is-not-extensible/74406136#74406136
  */

  const tree = JSON.parse(
    JSON.stringify(useSelector((state: RootState) => state.tree.Tree))
  );

  //accessing the redux store token
  const tokenSlice = useSelector((state: RootState) => state.tokens);

  //const initialValues: MyFormValues = { name: '', placeholder:'', value:'' };
  const { classes } = useStyles();

  const initialValuesGenerate = () => {
    const tokens = [];
    let token = { name: '', placeholder: '', value: '' };
    if (tokenSlice.tokens.length > 0) {
      tokenSlice.tokens.map((obj) => {
        tokens.push({
          name: obj.name,
          placeholder: obj.placeholder,
          value: obj.value,
        });
      });
    } else {
      tokens.push(token);
    }

    return tokens;
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          tokens: initialValuesGenerate(),
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          dispatch(toggleDrawer());

          /*
           saving the tokens to the dispatcher
          */
          dispatch(saveTokens(values.tokens));
          // console.log("redux tokens are", tokenSlice)
        }}
        render={({ values }) => (
          <ScrollArea style={{ height: 550 }} scrollbarSize={10}>
            <Form>
              <FieldArray
                name="tokens"
                render={(arrayHelpers) => (
                  <div>
                    {values.tokens && values.tokens.length > 0 ? (
                      values.tokens.map((tokens, index) => (
                        <div className={classes.formikForm} key={index}>
                          <div className={classes.formikFields}>
                            <Field
                              className={classes.formikField}
                              placeholder={`tokens.${index}.name`}
                              name={`tokens.${index}.name`}
                            />
                            <Field
                              className={classes.formikField}
                              placeholder={`tokens.${index}.placeholder`}
                              name={`tokens.${index}.placeholder`}
                            />
                            <Field
                              className={classes.formikField}
                              placeholder={`tokens.${index}.value`}
                              name={`tokens.${index}.value`}
                            />
                          </div>

                          <div>
                            {/* remove a token from the list  */}
                            <FontAwesomeIcon
                              size="1x"
                              className={classes.fontAwesomeIcon}
                              icon={faMinus}
                              onClick={() => arrayHelpers.remove(index)}
                            />

                            <FontAwesomeIcon
                              size="1x"
                              className={classes.fontAwesomeIcon}
                              icon={faPlus}
                              onClick={() => arrayHelpers.insert(index + 1, '')}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <Button
                        className={classes.fontAwesomeSubmitButton}
                        onClick={() => arrayHelpers.push('')}
                      >
                        Create Token
                      </Button>
                    )}
                    <div>
                      <Button
                        className={classes.fontAwesomeSubmitButton}
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                )}
              />
            </Form>
          </ScrollArea>
        )}
      />
    </div>
  );
};

export default FormToken;
