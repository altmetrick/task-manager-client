import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const PrivateRoutes = () => {
  const navigate = useNavigate();
  const isAuthorized = true;

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/auth');
    }
  }, [isAuthorized]);

  return (
    <>
      <Outlet />
    </>
  );
};
