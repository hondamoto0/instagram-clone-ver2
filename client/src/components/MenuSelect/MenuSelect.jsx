import React from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { deletePost } from '../../store/actions';
import { useDispatch } from 'react-redux';

const MenuSelect = ({ userId, post: { _id, postedBy } }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const isOwn = userId === postedBy._id;

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const _onDeletePost = postId => {
    dispatch(deletePost(postId));
  };

  const showMenuDelete = () => {
    return (
      isOwn && (
        <MenuItem onClick={() => _onDeletePost(_id)}>
          <DeleteOutlinedIcon />
          Delete Post
        </MenuItem>
      )
    );
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
        aria-label='settings'
      >
        <MoreVertIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id='menu-list-grow'>
                  {showMenuDelete()}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

MenuSelect.propTypes = {};

export default MenuSelect;
