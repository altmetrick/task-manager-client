import './TaskExcerpt.scss';
import { TaskT } from '../../types';
import { useNavigate } from 'react-router-dom';
import { AiFillCheckCircle, AiFillDelete } from 'react-icons/ai';
import { useAppDispatch } from '../../store/store';
import { deleteTask, updateTask } from './tasksSlice';
import { toast } from 'react-hot-toast';

type PropsT = {
  task: TaskT;
};

export const TaskExcerpt: React.FunctionComponent<PropsT> = ({ task }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleShowFullTask = () => {
    navigate(`task/${task._id}`);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const { message } = await dispatch(deleteTask(id)).unwrap();
      toast.success(message);
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    }
  };
  const handleToggleCompleted = async () => {
    try {
      const { message } = await dispatch(
        updateTask({ _id: task._id, completed: !task.completed })
      ).unwrap();

      toast.success(message);
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    }
  };

  return (
    <div className="task-excerpt">
      <div className="task-excerpt__main">
        <h2 className="task-excerpt__title">{task.title}</h2>

        <div className="task-actions">
          <button
            className="task-actions__btn task-actions__btn--delete"
            onClick={() => handleDeleteTask(task._id)}
          >
            <AiFillDelete className="icon" />
          </button>

          <button
            className={`task-actions__btn  ${task.completed && 'task-actions__btn--completed'}`}
            onClick={handleToggleCompleted}
          >
            <AiFillCheckCircle className="icon" />
          </button>
        </div>
      </div>

      <div className="task-excerpt__sub" onClick={handleShowFullTask}>
        <p>{task.body.substring(0, 60)}...</p>
      </div>
    </div>
  );
};
