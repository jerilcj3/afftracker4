import {
  createStyles,
  Accordion,
  ActionIcon,
  AccordionControlProps,
  Box,
  Button,
} from '@mantine/core';
import { IconDots } from '@tabler/icons';
import FormEmailNode from './FormEmailNode';
import FormEmailRotator from './FormEmailRotator';
import FormLanderNode from './FormLanderNode';
import FormLanderRotator from './FormLanderRotator';
import FormToken from './FormToken';
import type { RootState } from '../store';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { landerRotator } from '../slices/AccordianSlice';
import axios from 'axios';

interface TreeData {
  node: string;
  parent: string;
  type: string | undefined;
  url: string | undefined;
  weight: number | undefined;
}

const TreeDataValues: TreeData[] = [
  /* Setting default values for root campaign */
  {
    node: 'CAMPAIGN',
    parent: 'null',
    type: undefined,
    url: undefined,
    weight: undefined,
  },
];

const useStyles = createStyles((theme, _params, getRef) => ({
  saveCampaign: {
    width: '100%',
    marginTop: '20px',
    padding: '10px',
    borderRadius: '5px',
    height: '50px',
    border: 0,
  },
}));

function AccordionControl(props: AccordionControlProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Accordion.Control {...props} />
      <ActionIcon size="lg">
        <IconDots size={16} />
      </ActionIcon>
    </Box>
  );
}

const AccordianRoot: React.FC = ({}) => {
  const accordian = useSelector((state: RootState) => state.accordian);
  const tree = useSelector((state: RootState) => state.tree.Tree);
  const node = useSelector((state: RootState) => state.node);
  const tokens = useSelector((state: RootState) => state.tokens);
  const { classes } = useStyles();

  /* Code to traverse the tree  
     The reason this is done is because ```tree``` is a hierarchial data structure.
     This hierarchial data structure needs to be stored in the database. 
     Storing hierachial data directly to a relational database is not possible.
     Hence hierarchial data needs to be converted to a Adjacency List Model or Nested Set Model
     ### Further read on Adjacency List Model and Nested Set Model
     https://stackoverflow.com/questions/4048151/what-are-the-options-for-storing-hierarchical-data-in-a-relational-database   
     https://dba.stackexchange.com/questions/89051/stored-procedure-to-update-an-adjacency-model-to-nested-sets-model
     https://web.archive.org/web/20181221162916/http://mikehillyer.com/articles/managing-hierarchical-data-in-mysql/
     https://www.npmjs.com/package/mongoose-nested-set
     LTREE Postgresql - https://patshaughnessy.net/2017/12/11/trying-to-represent-a-tree-structure-using-postgres
     Convert data to hierachical JSON
     https://www.youtube.com/watch?v=7hZYh9qXxe4
     https://news.ycombinator.com/item?id=24184070
     https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-recursive-query/
     https://www.youtube.com/watch?v=3WXiCT6jurk
     https://www.youtube.com/watch?v=06HlvmB8mDk
  */

  function recursivelyIterateTree(treeObject: any) {
    if (treeObject.children.length > 0) {
      treeObject.children.forEach(function (child: any) {
        switch (child.attributes.type) {
          case 'landerRotator':
            TreeDataValues.push({
              node: child.name,
              parent: treeObject.name,
              type: undefined,
              url: undefined,
              weight: undefined,
            });
            break;
            
          case 'landerNode':
            TreeDataValues.push({
              node: child.name,
              parent: treeObject.name,
              type: child.attributes.type,
              url: child.attributes.url,
              weight: child.attributes.weight,
            });
            break;
        }
        recursivelyIterateTree(child);
      });
    }
  }

  async function onSubmit() {
    /* *** Todos
      
     Get the tree from the state
     Get the tokens from the state
     Post the tree JSON to the backend
     Save the tree JSON and tokens JSON in mongodb
    */
    await recursivelyIterateTree(tree);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_PYTHON_API}`,
        {
          TreeDataValues,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      //console.log(res); //check now
    } catch (e) {}
  }

  return (
    <Box>
      <Accordion
        variant="separated"
        radius="md"
        defaultValue="customization"
        styles={{
          item: {
            // styles added to all items
            backgroundColor: '#fff',
            border: '1px solid #ededed',

            // styles added to expanded item
            '&[data-active]': {
              backgroundColor: '#ccc',
            },
          },

          chevron: {
            // styles added to chevron when it should rotate
            '&[data-rotate]': {
              transform: 'rotate(-90deg)',
            },
          },
        }}
      >
        {/* Lander Rotator Form */}
        <Accordion.Item value="landerRotator">
          {/* If node is of type root, then only one lander rotator can be created under root. Multiple lander rotators cannot be created */}

          <Accordion.Control disabled={accordian.landerRotator}>
            Lander Rotator
          </Accordion.Control>
          <Accordion.Panel>
            {/* Lander Rotator Form */}
            <FormLanderRotator />
          </Accordion.Panel>
        </Accordion.Item>

        {/* Token Form */}
        <Accordion.Item value="configureTokens">
          <Accordion.Control disabled={accordian.tokens}>
            Configure Tokens
          </Accordion.Control>
          <Accordion.Panel>
            {/* Token Rotator Form */}
            <FormToken />
          </Accordion.Panel>
        </Accordion.Item>

        {/* Lander Node Form */}
        <Accordion.Item value="landerNode">
          <Accordion.Control disabled={accordian.landerNode}>
            Lander Node
          </Accordion.Control>
          <Accordion.Panel>
            {/* Form Lander Node Form */}
            <FormLanderNode />
          </Accordion.Panel>
        </Accordion.Item>

        {/* Email Rotator Form */}
        <Accordion.Item value="emailRotator">
          <Accordion.Control disabled={accordian.emailRotator}>
            Email Rotator
          </Accordion.Control>
          <Accordion.Panel>
            {/* Form Lander Node Form */}
            <FormEmailRotator />
          </Accordion.Panel>
        </Accordion.Item>

        {/* Email Node Form */}
        <Accordion.Item value="emailNode">
          <Accordion.Control disabled={accordian.emailNode}>
            Email Node
          </Accordion.Control>
          <Accordion.Panel>
            {/* Form Lander Node Form */}
            <FormEmailNode />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <Button className={classes.saveCampaign} onClick={onSubmit}>
        SAVE CAMPAIGN
      </Button>
    </Box>
  );
};

export default AccordianRoot;
