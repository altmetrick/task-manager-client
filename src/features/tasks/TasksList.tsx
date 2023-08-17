import './TaskList.scss';
import { TaskExcerpt } from './TaskExcerpt';
import { useAppSelector } from '../../store/store';
import { selectAllTasksSorted } from './tasksSlice';
import { Skeleton } from '../../components/skeleton/Skeleton';

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
    if (tasks) {
      content = tasks.map((task) => <TaskExcerpt task={task} key={task._id} />);
    } else {
      content = <p>You don't have any tasks</p>;
    }
  }

  return <div className="task-list">{content}</div>;
};
