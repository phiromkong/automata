import {
  Box,
  Chip,
  styled,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  MenuList,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import FaModel from 'app/models/FaModel';
import { toStateString } from 'utils/string-utils';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteDialog from 'app/components/Dialogs/DeleteDialog';
import FaDatabase from 'app/services/cloud_database/FasDatabase';
import ListModel from 'app/models/ListModel';

// Defining the StyledBox and StyledHover components using the `styled` utility from `@mui/system`. This allows you to apply consistent spacing, typography, color, and other designs to your components.
const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '12px 16px',
  marginBottom: '24px',
  borderRadius: '4px',
  boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
}));
const StyledHover = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
}));

// FaCardItemProps interface defines the properties that the FaCardItem component expects.
interface FaCardItemProps {
  item: FaModel;
  faList: ListModel<FaModel>;
  setFaList: React.Dispatch< React.SetStateAction<ListModel<FaModel> | undefined> >;
  [props: string]: any;
}

// The FaCardItem component.
const FaCardItem = ({ item, faList, setFaList, ...props }: FaCardItemProps) => {
  // Creating state variables using the `useState` hook. `anchorEl` is used to control the display of the dropdown menu.
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openDots = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);

  // Theses are utils that turn the respective parts of the Fa data into string 
  const states = toStateString('States', item?.states || []);
  const symbols = toStateString('Symbols', item?.symbols || []);
  const finalStates = toStateString('Final states', item?.endStates || []);

  // `useLocation` hook to access the current URL location of the application. `useHistory` hook for navigating.
  const location = useLocation();
  const history = useHistory();

  // This function handles the click on the card title. It redirects the user to the `/fas/{id}` route.
  const onTitleClick = e => {
    if (item) {
      const id = item!.id;
      history.push(`/fas/${id}`);
    }
  };

  // This function handles the click on the menu button (the three dots). It shows the dropdown menu.
  const onMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close the drop down menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to delete a FA from the list, using the provided `FaDatabase`.
  const onDelete = async () => {
    try {
      if (item.id) {
        handleCloseDialog();
        setAnchorEl(null);
        // We create a copy of current fas, remove the deleted one then set the new list to state
        const data: ListModel<FaModel> = { ...faList };
        data.items = data.items.filter(fa => fa.id !== item.id);
        setFaList(data);
        await new FaDatabase().delete(item.id);
        history.replace({
          pathname: location.pathname,
          state: { openSnackBar: true },
        } as any);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // These handle opening and closing of the delete confirmation dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  // The component returns some JSX which defines how the component renders. This includes a title, a delete button, a dropdown menu etc.
  return (
    <StyledBox>
      <div>
        <StyledHover onClick={onTitleClick}>{item && item.title}</StyledHover>

        <Typography
          variant="subtitle1"
          sx={{ color: 'rgba(0,0,0,0.6)' }}
        >{`${states} - ${symbols}`}</Typography>
        <Chip
          sx={{ margin: '18px 4px', color: 'rgba(0,0,0,0.6)' }}
          label={item ? (item?.isNFA() ? 'NFA' : 'DFA') : 'FA'}
        />
        <Chip
          sx={{ margin: '18px 4px', color: 'rgba(0,0,0,0.6)' }}
          label={`Start state: ${item?.startState}`}
        />
        <Chip
          sx={{ margin: '18px 4px', color: 'rgba(0,0,0,0.6)' }}
          label={finalStates}
        />
      </div>
      <div>
        <IconButton onClick={onMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={openDots} onClose={handleClose}>
          <MenuItem onClick={handleOpenDialog}>
            <ListItemIcon sx={{ alignItems: 'center' }}>
              <DeleteForeverIcon fontSize="small" color="error" />
              <ListItemText
                sx={{ fontSize: '12px', fontWeight: '500', marginLeft: '2px' }}
              >
                Delete
              </ListItemText>
            </ListItemIcon>
          </MenuItem>
        </Menu>
        <DeleteDialog
          content={''}
          open={openDialog}
          handleClose={handleCloseDialog}
          onDelete={onDelete}
        />
      </div>
    </StyledBox>
  );
};

// Exporting the component so that it can be imported and used in other files.
export default FaCardItem;
