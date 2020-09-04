import React from 'react';
import { Spinner } from '../components';

const withSpinners = Component => {
  return ({ loading, ...otherProps }) => {
    if (loading) {
      return <Spinner />;
    } else {
      return <Component {...otherProps} />;
    }
  };
};

export default withSpinners;
