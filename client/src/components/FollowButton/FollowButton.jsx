import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { followingUser, unfollowingUser } from '../../store/actions';
const FollowButton = ({ authId, userId, isFollowing }) => {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  async function _onHandleFollow(followId) {
    setDisabled(true);
    if (isFollowing) {
      return dispatch(unfollowingUser(followId)).then(_ => setDisabled(false));
    } else {
      return dispatch(followingUser(followId)).then(_ => setDisabled(false));
    }
  }

  if (authId === userId) {
    return <></>;
  }
  return (
    <Button
      onClick={() => _onHandleFollow(userId)}
      variant='contained'
      color='primary'
      disabled={disabled}
    >
      {!isFollowing ? 'Follow' : 'Unfollow'}
    </Button>
  );
};

FollowButton.propTypes = {};

export default FollowButton;
