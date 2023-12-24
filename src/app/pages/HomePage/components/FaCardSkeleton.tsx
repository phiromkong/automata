import { Skeleton, Box, styled, Grid } from '@mui/material';
import React from 'react';
import FaCardItem from './FaCardItem';

// Defining the StyledBox component using the `styled` utility from `@mui/system`. This allows you to apply consistent spacing, typography, color, and other designs to your components.
const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '12px 16px',
  marginBottom: '24px',
  borderRadius: '4px',
  boxShadow:
    '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
}));

// The FaCardSkeleton component.
const FaCardSkeleton = () => {
  return (
    // Grid is a container component, it uses CSS’s Flexible Box module for layout.
    <Grid item>
      {/* This creates an array of 3 items and for each one it creates a 'StyledBox' that contains Skeleton components. 
          Skeleton components are used as a placeholder previews for content that is yet to load. 
          They improve perceived performance by making apps feel more responsive. */}
      {[1, 2, 3].map(item => (
        <StyledBox key={item}>
          <Box>
            {/* A wave animation Skeleton with a width of 120 pixels */}
            <Skeleton animation="wave" width={120} />

            {/* A wave animation Skeleton with a width of 250 pixels */}
            <Skeleton animation="wave" width={250} />

            {/* A flex Box that contains circular Skeleton components of 90 and 120 pixels width respectively */}
            <Box sx={{ display: 'flex' }}>
              <Skeleton
                animation="wave"
                variant="circular"
                width={90}
                height={27}
                sx={{ margin: '18px 4px', borderRadius: '16px' }}
              />
              <Skeleton
                animation="wave"
                variant="circular"
                width={120}
                height={27}
                sx={{ margin: '18px 4px', borderRadius: '16px' }}
              />
            </Box>

            {/* A wave animation Skeleton with a width of 35 pixels and a height of 28 pixels */}
            <Skeleton animation="wave" width={35} height={28} />
          </Box>

          <div>
            {/* A wave animation Skeleton with a width of 5 pixels and a height of 40 pixels, with a right margin of 25px */}
            <Skeleton
              animation="wave"
              width={5}
              height={40}
              sx={{ marginRight: '25px' }}
            />
          </div>
        </StyledBox>
      ))}
    </Grid>
  );
};

// Exporting the component so that it can be imported and used in other files
export default FaCardSkeleton;

