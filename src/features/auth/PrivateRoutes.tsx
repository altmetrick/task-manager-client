import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { isLoggedIn } from './authSlice';

export const PrivateRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const checkIsLoggedIn = async () => {
    const isAuthorized = await dispatch(isLoggedIn()).unwrap();

    if (!isAuthorized) {
      navigate('/auth/login');
    }
  };

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};
