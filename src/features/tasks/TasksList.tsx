import './TaskList.scss';
import { TaskExcerpt } from './TaskExcerpt';
import { useAppSelector } from '../../store/store';
import { selectAllTasksSorted } from './tasksSlice';
import { Skeleton } from '../../components/skeleton/Skeleton';
import { Link } from 'react-router-dom';

export const TasksList = () => {
  const tasks = useAppSelector((state) => selectAllTasksSorted(state));
  const status = useAppSelector((state) => state.tasks.status);

  let content;

  if (status === 'loading') {
    content = (
      <div>
        <Skeleton times={4} />
      </div>
    );
  } else {
    if (tasks?.length) {
      content = tasks.map((task) => <TaskExcerpt task={task} key={task._id} />);
    } else {
      content = <p>You don't have any tasks, start with creating a new one!</p>;
    }
  }

  return (
    <>
      <div className="task-list">{content}</div>
      <div className="flex flex-justify-center u-margin-top-small">
        <Link className="btn btn--action" to={'/task'}>
          Add New Task
        </Link>
      </div>
    </>
  );
};
