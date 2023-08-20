import { Outlet } from 'react-router-dom';

export const AuthPage = () => {
  return (
    <div className="container-main">
      <Outlet />
    </div>
  );
};
