import AddIcon from '@mui/icons-material/Add';
import {
  Typography,
  styled,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControl,
  Grid,
} from '@mui/material';
import useShiftKey from 'app/hooks/useShiftKey';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';


// Using MUI's styled function to create a styled 'div' component. This div, ActionContainer, is used as a container for the Action buttons
// The styles applied to the div will make it responsive and align its items toward the end (right side) on larger screens and towards the start (left side) on smaller screens
const ActionContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: 1,
  gap: '14px',
  justifyContent: 'flex-end',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    marginTop: '12px',
    justifyContent: 'flex-start',
  },
}));

// This component receives 'sortBy' and 'setSortBy' for sorting functionality, and 'orderBy' and 'setOrderBy' for ordering functionality.
const Title = ({ sortBy, setSortBy, orderBy, setOrderBy }) => {
  const history = useHistory();

  // These states hold whether sort and order select boxes are open or not
  const [clickSortButton, setClickSortButton] = useState(false);
  const [clickOrderButton, setClickOrderButton] = useState(false);

  // These custom hooks listen for pressing of certain keys and toggle the open state of the sort and order select boxes respectively when their keys are pressed
  useShiftKey(() => setClickSortButton(!clickSortButton), "F1");
  useShiftKey(() => setClickOrderButton(!clickOrderButton), "F2");
  // This custom hook listens for the pressing of 'A' key and navigate to '/add' route
  useShiftKey(() => history.push('/add'), "A");

  // In the return statement we define what the component renders.
  return (
    <Grid container>
      <Grid item xs={12} sm={6} lg={7.5} md={6}>
        <Typography sx={{ flex: 3, fontSize: '24px' }}>
          Dashboard
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} lg={4.5} md={6}>
        <ActionContainer>
          <form>
            <FormControl>
              <InputLabel>Sort</InputLabel>
              <Select
                label="Sort"
                size="small"
                open={clickSortButton}
                onOpen={() => setClickSortButton(true)}
                onClose={() => setClickSortButton(false)}
                onChange={e => setSortBy(e.target.value)}
                value={sortBy}
              >
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="created_at">Published Date</MenuItem>
                <MenuItem value="updated_at">Recently Update</MenuItem>
              </Select>
            </FormControl>{' '}
          </form>
          <form>
            <FormControl>
              <Select
                size="small"
                open={clickOrderButton}
                onOpen={() => setClickOrderButton(true)}
                onClose={() => setClickOrderButton(false)}
                onChange={e => setOrderBy(e.target.value)}
                value={orderBy}
              >
                <MenuItem value="asc">A-Z</MenuItem>
                <MenuItem value="desc">Z-A</MenuItem>
              </Select>
            </FormControl>{' '}
          </form>

          <Link to="/add">
          <Button sx={{ backgroundColor: '#5bd9d7', color: '#000' }} endIcon={<AddIcon />}>
            Add
          </Button>
          </Link>
        </ActionContainer>
      </Grid>
    </Grid>
  );
};
// Exporting the component so it can be used in other parts of the application
export default Title;
