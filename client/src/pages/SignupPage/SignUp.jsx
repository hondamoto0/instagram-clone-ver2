import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../store/actions';
import { useStyles } from './styles';
import { Copyright } from '../../components';
import { Link, useHistory } from 'react-router-dom';
import { Layout } from '../../hoc';
const SignUp = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
  });

  const { email, password, username } = form;

  const classes = useStyles();
  const _onSubmitHandler = e => {
    e.preventDefault();
    dispatch(signUp(form, history));
  };

  const _onChangeHandler = ({ target: { value, name, type } }) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <Layout title='Sign Up' containerSize='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        <form onSubmit={e => _onSubmitHandler(e)} className={classes.form}>
          <TextField
            onChange={e => _onChangeHandler(e)}
            value={username}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
          />
          <TextField
            onChange={e => _onChangeHandler(e)}
            value={email}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
          />
          <TextField
            value={password}
            onChange={e => _onChangeHandler(e)}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={loading}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link className={classes.link} href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link className={classes.link} to='/signin' variant='body2'>
                {'Have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Layout>
  );
};

SignUp.propTypes = {};

export default SignUp;
