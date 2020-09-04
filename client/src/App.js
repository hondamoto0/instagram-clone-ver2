import React, { useEffect } from 'react';
import { Navbar, Spinner, ModalImage } from './components';

import { Home, SignIn, SignUp, Profile, CreatePost } from './pages';

import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth } from './store/actions';
import { useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const isResolved = useSelector(state => state.auth.isResolved);
  const selectedImage = useSelector(state => state.image.selectedImage);
  useEffect(() => {
    dispatch(auth());
  }, []);
  return (
    <>
      {isResolved ? (
        <div>
          <Navbar />
          {selectedImage && <ModalImage selectedImage={selectedImage} />}
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/profile/:userId'>
            <Profile />
          </Route>
          <Route exact path='/create-post'>
            <CreatePost />
          </Route>
          <Route exact path='/signup'>
            <SignUp />
          </Route>
          <Route exact path='/signin'>
            <SignIn />
          </Route>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default App;
