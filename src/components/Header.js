import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../slice/userSlice';
import { LOGO } from '../utils/constants';
import { auth } from '../utils/firebase';

const Header = () => {

  const dispatch = useDispatch();
  const user = useSelector( store => store.user );
  const navigate = useNavigate();

  useEffect( () => {
    const unsubscribe = onAuthStateChanged( auth, ( user ) => {
      if ( user ) {
        const { uid, email, displayName, photoURL } = user;
        dispatch( addUser( { uid, email, displayName, photoURL } ) );
        navigate( '/browse' );
      } else {
        dispatch( removeUser() );
        navigate( '/' );
      };
    } );

    return () => unsubscribe();
  }, [] );

  const handleSignOut = () => {
    signOut( auth )
      .then( () => {
      } )
      .catch( ( error ) => {
        navigate( '/error' );
      } );
  };

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
      <img className='w-44 mx-auto md:mx-0' src={ LOGO } alt='logo' />
      { user && (
        <div className='flex p-2 justify-between'>
          <img className='hidden md:block w-12 h-12' alt='usericon' src={ user?.photoURL } />
          <button onClick={ handleSignOut } className='font-bold text-white '>(Sign Out)</button>
        </div>
      )}
    </div>
  );

};

export default Header;