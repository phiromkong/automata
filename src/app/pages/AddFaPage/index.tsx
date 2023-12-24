import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FormFields from './components/FormFields';
import {
  getArrayFromValues,
  getTransitionObjectFromForm,
} from 'utils/form-utils';
import FaModel from 'app/models/FaModel';
import Features from './components/Features';
import SnackBar from 'app/components/SnackBar';
import { useLocation, useParams } from 'react-router-dom';
import FaCacheService from 'app/services/cache/FaCacheService';
import FaDatabase from 'app/services/cloud_database/FasDatabase';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Backdrop } from '@mui/material';
import { motion } from 'framer-motion';

// Define the styled container
const StyledContainer = styled('div')(({ theme }) => ({
  margin: '64px 144px',
  maxWidth: '1600px',
  [theme.breakpoints.down('lg')]: {
    margin: '64px 15px',
  },
}));

// Define the parameters type
type Params = {
  id: string;
};

// Define the state type
interface stateType {
  openSnackBar: boolean;
}

// Define the AddFaPage component
export function AddFaPage() {
  // Define the history, location, and parameters hooks
  const history = useHistory();
  const location = useLocation<stateType>();
  const [faData, setFaData] = useState<FaModel>();
  const [open, setOpen] = useState(false);
  const { id } = useParams<Params>();

  // Define the useEffect hook for the openSnackBar state
  useEffect(() => {
    setOpen(location.state?.openSnackBar);
  }, [location]);

  // Define the useEffect hook for the id parameter
  useEffect(() => {
    async function loadExistingFaById(id) {
      // Fetch from cache
      let fa = new FaCacheService().get(id);
      if (fa) {
        setFaData(fa);
      } else {
        // Fetch from firebase
        fa = await new FaDatabase().fetchOne(id);
        setFaData(fa);
      }
      if (!fa) history.push({ pathname: '/add' });
    }
    if (id) loadExistingFaById(id);
  }, [history, id]);

  // Define the onSubmit function
  const onSubmit = async (data, e) => {
    const { startState, states, symbols, title, endStates, ...newData } = data;
    let Fa;
    if (faData) {
      Fa = faData?.copyWith(
        getArrayFromValues(states),
        getArrayFromValues(symbols),
        startState,
        endStates,
        getTransitionObjectFromForm(data),
        ...Array(2),
        title,
      );
    } else {
      Fa = new FaModel(
        getArrayFromValues(states),
        getArrayFromValues(symbols),
        startState,
        endStates,
        getTransitionObjectFromForm(data),
        ...Array(2),
        title,
      );
    }

    try {
      if (location.pathname === '/add') {
        const newFa = await new FaDatabase().create(Fa);
        if (newFa) {
          history.replace({
            pathname: `/fas/${newFa.id}`,
            state: { openSnackBar: true },
          } as any);
        }
      } else {
        Fa.updatedAt = new Date().toUTCString();
        const updatedFa = await new FaDatabase().update(Fa.id!, Fa);
        if (updatedFa) {
          new FaCacheService().set(updatedFa);
          history.replace({
            pathname: `/fas/${updatedFa.id}`,
            state: { openSnackBar: true },
          } as any);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Define the onCloseSnackBar function
  const onCloseSnackBar = () => {
    setOpen(false);
  };

  // If the faData is not loaded and id is present, show a loading spinner
  if (!faData && id)
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={id ? true : false}
      >
        <CircularProgress />
      </Backdrop>
    );
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };
  return (
    <>
      <Helmet>
        <title>Create new Finite Automaton</title>
        <meta name="description" content="Create new finite automaton" />
      </Helmet>
      <StyledContainer>
        <motion.div
          initial={initial}
          animate={animate}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <FormFields faData={faData} onSubmit={onSubmit} />
        </motion.div>
        <motion.div
          initial={initial}
          animate={animate}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Features faData={faData} />
        </motion.div>
      </StyledContainer>
      <SnackBar
        open={open}
        onClose={onCloseSnackBar}
        type="success"
        content="Save Successfully"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </>
  );
}
