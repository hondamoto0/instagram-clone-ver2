import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout } from '../../hoc';
import { Grid, Box, Typography, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { useStyles } from './styles';
import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetailedInfo } from '../../store/actions';
import { Spinner, CardItem, FollowButton } from '../../components';
import { useParams } from 'react-router-dom';
import { removeLastCharacter } from '../../helpers';
const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const auth = useSelector(state => state.auth);
  const { userInfo, detailedUserPosts, loading, isFollowing } = useSelector(
    state => state.userDetailed
  );
  const authId = auth.user && auth.user._id;

  useEffect(() => {
    dispatch(getUserDetailedInfo(userId));
  }, [userId]);

  function showProfileHeader() {
    if (userInfo) {
      const { username, followings, followers } = userInfo;
      return (
        <Grid container>
          <Grid item xs={0} md={2}></Grid>
          <Grid item xs={5} md={3}>
            <Avatar
              className={classes.avatar}
              alt='avatar image'
              src='https://lh3.googleusercontent.com/proxy/ukE95kYc649h_vgDzaoMJ-bdY4ya9moEPNQ7fn7jISVhD4WDNwi5j_xvdAbJEX_h19BzRhyREXoQT_W1XFNo29_v_Frsvlgw7g1m-8TRSHa3ck-b'
            />
          </Grid>
          <Grid item xs={7}>
            <Typography variant='h5'>{username}</Typography>
            <Box display='flex' mt={3}>
              <div className={classes.shortText}>
                <strong>{detailedUserPosts.length}</strong>&nbsp;
                <span>
                  {removeLastCharacter(detailedUserPosts.length, 'posts')}
                </span>
              </div>
              <div className={classes.shortText}>
                <strong>{followers.length}</strong>&nbsp;
                <span>
                  {removeLastCharacter(followers.length, 'followers')}
                </span>
              </div>
              <div>
                <strong>{followings.length}</strong>&nbsp;
                <span>
                  {removeLastCharacter(followings.length, 'followings')}
                </span>
              </div>
            </Box>
            <Box pt={2}>
              <FollowButton
                authId={authId}
                userId={userId}
                isFollowing={isFollowing}
                loading={loading}
              />
            </Box>
          </Grid>
        </Grid>
      );
    }
  }

  function showProfileImage() {
    if (userInfo) {
      return (
        <Box mt={5}>
          <Grid container>
            {detailedUserPosts.length > 0 ? (
              detailedUserPosts.map(post => (
                <CardItem key={post._id} post={post} />
              ))
            ) : (
              <div>There's no post</div>
            )}
          </Grid>
        </Box>
      );
    }
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <Layout containerSize='lg'>
        <Box mt={4} mb={2}>
          {showProfileHeader()}
        </Box>
        <Divider />
        {showProfileImage()}
      </Layout>
    </>
  );
};

Profile.propTypes = {};

export default Profile;
