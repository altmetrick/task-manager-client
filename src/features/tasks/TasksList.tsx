import './TaskList.scss';
import { TaskExcerpt } from './TaskExcerpt';
import { useAppSelector } from '../../store/store';
import { selectTasksByFilter } from './tasksSlice';
import { Skeleton } from '../../components/skeleton/Skeleton';
import { Link } from 'react-router-dom';
import { TasksFilter } from './TasksFilter';

export const TasksList = () => {
  const tasks = useAppSelector((state) => selectTasksByFilter(state));
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
      <TasksFilter />
      <div className="task-list">{content}</div>

      <div className="box-button">
        <Link className="btn btn--action btn--add-new-task" to={'/task'}>
          Add New Task
        </Link>
      </div>
    </>
  );
};
