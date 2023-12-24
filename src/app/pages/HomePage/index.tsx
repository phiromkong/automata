import { Box, Divider, Grid, styled, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Title from './components/Title';
import Search from './components/Search';
import FaCardContainer from './components/FaCardContainer';
import FaDatabase from 'app/services/cloud_database/FasDatabase';
import ListModel from 'app/models/ListModel';
import FaModel from 'app/models/FaModel';
import FaCardSkeleton from './components/FaCardSkeleton';
import FaCacheService from 'app/services/cache/FaCacheService';
import useQuery from 'app/hooks/useQuery';
import { validateOrderByQuery, validateSortByQuery } from 'utils/string-utils';
import { OrderByFields } from 'app/services/cloud_database/BaseDatabase';
import { OrderByDirection } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import SnackBar from 'app/components/SnackBar';
import { motion } from 'framer-motion';
// A function that defines the style of the main container
const StyledContainer = styled(Box)(({ theme }) => ({
  margin: '64px 144px',
  maxWidth: '1200px',
  minHeight: '100vh',
  [theme.breakpoints.down('md')]: {
    margin: '64px 15px',
  },
}));

interface locationType {
  openSnackBar: boolean;
}
// This is the main component 'HomePage'
export function HomePage() {
  // This hook is to get any query parameters from the URL
  const query = useQuery();
  // Using the useLocation hook from react-router-dom to access the current location state
  const location = useLocation<locationType>();
  // Various useState hooks to manage state of the component
  const [faList, setFaList] = useState<ListModel<FaModel>>();
  const [filteredFa, setFilteredFa] = useState<ListModel<FaModel>>();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [open, setOpen] = useState(false);
  const [orderBy, setOrderBy] = useState<OrderByDirection>(
    validateSortByQuery(query.get('sortBy')),
  );
  const [sortBy, setSortBy] = useState<OrderByFields>(
    validateOrderByQuery(query.get('orderBy')),
  );
  // Function to load all FAQs in the database
  async function loadFa() {
    const result = await new FaDatabase().fetchAllFa(
      undefined,
      undefined,
      sortBy,
      orderBy,
    );
    console.log(result);
    setFaList(result);
  }
  // useEffect hooks to update FAQ data on component mount and on changes to the sort/order
  useEffect(() => {
    setOpen(location.state?.openSnackBar);
  }, [location]);

  useEffect(() => {
    loadFa();
  }, [sortBy, orderBy]);
  // Function to cache the FAQ items
  useEffect(() => {
    function cacheItems() {
      const cacheService = new FaCacheService();
      cacheService.setAll(faList?.items || []);
    }
    cacheItems();
  }, [faList?.items, setFaList]);
  // Function to handle the closure of the snack bar  
  const onCloseSnackBar = () => {
    setOpen(false);
  };
  // Function to load more FAQ items. This fetches the items from the next page of the database and updates the state faList
  const loadMoreFa = async () => {
    if (faList && faList.nextPageKey) {
      try {
        const result = await new FaDatabase().fetchAllFa(
          faList.nextPageKey,
          undefined,
          sortBy,
          orderBy,
        );
        const data: ListModel<FaModel> = { ...faList };
        data.items = [...data.items, ...result.items];
        data.nextPageKey = result.nextPageKey;
        setFaList(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  // Function to handle search functionality. This function filters the FAQ list based on the search keyword
  const onSearch = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const keywordEvent = event.target.value;
    setSearchKeyword(event.target.value);
    if (faList) {
      const data: ListModel<FaModel> = { ...faList };
      data.items = data.items.filter(item =>
        item.title?.toLowerCase().includes(keywordEvent.toLowerCase()),
      );
      setFilteredFa(data);
    }
  };

  const initial = { opacity: 0 };
  const animate = { opacity: 1 };
  // This is the return statement which specifies what the component will render
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Automata Web" />
      </Helmet>
      <motion.div
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Box
          sx={{
            paddingLeft: '100px',
            paddingRight: '100px',
            paddingTop: '20px',
            textAlign: 'left',
            margin: 'auto',
          }}
        >
          <Title
            setSortBy={setSortBy}
            sortBy={sortBy}
            setOrderBy={setOrderBy}
            orderBy={orderBy}
          />
          <Divider sx={{ margin: '22px 0' }} />
        </Box>
      </motion.div>
      <Box
        sx={{
          paddingLeft: '100px',
          paddingRight: '100px',
          paddingTop: '20px',
          textAlign: 'left',
          margin: 'auto',
        }}
      >
        <motion.div
          initial={initial}
          animate={animate}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Search onSearch={onSearch} />
        </motion.div>
        <Divider sx={{ margin: '22px 0' }} />
        <Grid item xs={12} md={9}>
          <FaCardContainer
            faList={searchKeyword.length > 0 ? filteredFa! : faList!}
            setFaList={setFaList}
          />
          {faList ? (
            faList.nextPageKey && !searchKeyword.length ? (
              <Button
                variant="outlined"
                onClick={loadMoreFa}
                sx={{ display: 'flex', width: '100%' }}
              >
                Load More...
              </Button>
            ) : (
              <Typography sx={{ textAlign: 'center' }}></Typography>
            )
          ) : (
            <FaCardSkeleton />
          )}
        </Grid>
        <SnackBar
          open={open}
          onClose={onCloseSnackBar}
          type="success"
          content="Delete Successfully"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
      </Box>
    </>
  );
}
