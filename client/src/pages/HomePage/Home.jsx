import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout } from '../../hoc';

import { CardPhoto, Spinner } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/actions';
import { Box, Grid } from '@material-ui/core';
const Home = () => {
  const posts = useSelector(state => state.posts.posts);
  const auth = useSelector(state => state.auth);
  const loading = useSelector(state => state.posts.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, []);
  function showSpinner() {
    if (loading) return <Spinner />;
  }
  function showImages() {
    if (!loading)
      return (
        <>
          {posts && posts.length > 0 ? (
            posts.map(post => (
              <Grid key={post._id} item md={6}>
                <Box mt={4} mx={3}>
                  <CardPhoto
                    userId={auth && auth.user && auth.user._id}
                    post={post}
                  />
                </Box>
              </Grid>
            ))
          ) : (
            <div>There's no post</div>
          )}
        </>
      );
  }
  return (
    <Layout containerSize='lg' title='Home'>
      <Grid container>
        {showSpinner()}
        {showImages()}
      </Grid>
    </Layout>
  );
};

Home.propTypes = {};

export default Home;
