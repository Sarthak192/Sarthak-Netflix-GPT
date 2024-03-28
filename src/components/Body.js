import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Browse from './Browse';
import Login from './Login';

const Body = () => {

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

  return (
    <div>
      <RouterProvider router={ router } />
    </div>
  );

};

export default Body;