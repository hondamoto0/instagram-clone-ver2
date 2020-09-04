import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';

const CardItem = ({ post }) => {
  return (
    <Grid item xs={6} md={4} lg={4}>
      <Box m={1}>
        <div>
          <img
            src={`http://localhost:5000/${post.photo}`}
            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
          />
        </div>
      </Box>
    </Grid>
  );
};

CardItem.propTypes = {};

export default CardItem;
