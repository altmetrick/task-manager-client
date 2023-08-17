import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { useAppDispatch } from '../store/store';
import { fetchTasks } from '../features/tasks/tasksSlice';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const getTasks = async () => {
    try {
      const res = await dispatch(fetchTasks()).unwrap();

      console.log(res);
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

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
