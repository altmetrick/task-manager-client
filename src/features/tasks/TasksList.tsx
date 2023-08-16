import './TaskList.scss';
import { TaskExcerpt } from './TaskExcerpt';
import { useEffect, useState } from 'react';
import { AppDispatch, useAppSelector } from '../../store/store';
import { fetchTasks, selectAllTasksSorted } from './tasksSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';

export const TasksList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState(null);

  const tasks = useAppSelector((state) => selectAllTasksSorted(state));

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const res = await dispatch(fetchTasks()).unwrap();
      setIsLoading(false);
      console.log(res);
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    if (!tasks?.length) {
      getTasks();
    }
  }, []);

  let content;

  if (isLoading) {
    //should be skeleton
    content = <div>Loading...</div>;
  } else {
    if (tasks) {
      content = tasks.map((task) => <TaskExcerpt task={task} key={task._id} />);
    } else {
      content = <p>You don't have tasks</p>;
    }
  }

  return <div className="task-list">{content}</div>;
};
