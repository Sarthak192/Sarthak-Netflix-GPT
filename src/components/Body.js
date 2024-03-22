import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { addUser, removeUser } from '../slice/userSlice';
import { auth } from '../utils/firebase';
import Browse from './Browse';
import Login from './Login';

const Body = () => {

  const dispath = useDispatch();

  const router = createBrowserRouter( [
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/browse',
      element: <Browse />
    }
  ] );

  useEffect( () => {
    onAuthStateChanged( auth, ( user ) => {
      if ( user ) {
        const { uid, email, displayName } = user;
        dispath( addUser( { uid, email, displayName } ) );
      } else {
        dispath( removeUser() );
      }
    } )
  }, [] );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );

};

export default Body;