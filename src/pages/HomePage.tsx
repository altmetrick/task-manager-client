import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export const HomePage = () => {
  return (
    <>
      <Header />
      <main className="container-main">
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
};
