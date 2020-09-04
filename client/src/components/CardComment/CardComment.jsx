import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../store/actions';

const CardComment = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const { user, username, text, _id } = comment;
  const userId = useSelector(state => state.auth.user && state.auth.user._id);

  const _onDeletePost = (postId, commentId) => {
    dispatch(deleteComment(postId, commentId));
  };

  const showDeletePost = () => {
    return (
      userId === user && (
        <Box>
          <DeleteOutlinedIcon onClick={() => _onDeletePost(postId, _id)} />
        </Box>
      )
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <strong inline style={{ display: 'inline-block' }} variant='subtitle2'>
          {username}
        </strong>
        &nbsp;
        <span inline style={{ display: 'inline-block' }} variant='body2'>
          {text}
        </span>
      </div>
      {showDeletePost()}
    </div>
  );
};

CardComment.propTypes = {};

export default CardComment;
