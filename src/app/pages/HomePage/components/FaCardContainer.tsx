import { Grid } from '@mui/material';
import FaModel from 'app/models/FaModel';
import ListModel from 'app/models/ListModel';
import React from 'react';
import FaCardItem from './FaCardItem';
import { motion } from 'framer-motion';

// Define the props for the FaCardContainer component
interface FaCardContainerProps {
  faList: ListModel<FaModel>; // A list of FaModel items
  setFaList: React.Dispatch<
    React.SetStateAction<ListModel<FaModel> | undefined>
  >; // A function to set the faList state
  [props: string]: any; // Any other props passed to the component
}

// Define the FaCardContainer component
const FaCardContainer = ({
  faList,
  setFaList,
  ...props
}: FaCardContainerProps) => {
  // Define the initial, animate, and transition states for the framer-motion component
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };
  const transition = { duration: 0.3, delay: 0.8 };

  // Return the component JSX
  return (
    <Grid item>
      {faList &&
        faList.items.map((item, index) => {
          // For each item in the faList, return a FaCardItem component
          return (
            <motion.div
              animate={animate}
              initial={initial}
              transition={transition}
            >
              <FaCardItem
                key={index}
                item={item}
                faList={faList}
                setFaList={setFaList}
              />
            </motion.div>
          );
        })}
    </Grid>
  );
};

export default FaCardContainer;
