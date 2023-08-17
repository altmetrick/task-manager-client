import { Link, useNavigate, useParams } from 'react-router-dom';
import './SingleTask.scss';
import { AiFillDelete, AiFillEdit, AiFillCheckCircle, AiOutlineArrowLeft } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { deleteTask, selectTaskById, updateTask } from './tasksSlice';
import { format, parseISO } from 'date-fns';
import toast from 'react-hot-toast';
import { Skeleton } from '../../components/skeleton/Skeleton';

export const SingleTask = () => {
  const navigate = useNavigate();
  let { taskId } = useParams();

  const dispatch = useAppDispatch();

  if (!taskId) {
    taskId = 'xxxx';
  }

  const task = useAppSelector(selectTaskById(taskId));

  const handleDeleteTask = async () => {
    if (task) {
      try {
        const { message } = await dispatch(deleteTask(task._id)).unwrap();

        navigate(-1);
        toast.success(message);
      } catch (err: any) {
        toast.error(err.message);
        console.log(err);
      }
    }
  };
  const handleToggleCompleted = async () => {
    try {
      const { message } = await dispatch(
        //@ts-ignore
        updateTask({ _id: task._id, completed: !task.completed })
      ).unwrap();

      toast.success(message);
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    }
  };

  let content;

  if (!task) {
    content = <Skeleton times={1} />;
  } else {
    content = (
      <div className="task">
        <div className="task__main">
          <h2 className="task__title">{task.title}</h2>

          <div className="task-actions">
            <button className="task-actions__btn task-actions__btn--edit">
              <Link to={`/task/edit/${taskId}`}>
                <AiFillEdit className="icon" />
              </Link>
            </button>
            <button
              className="task-actions__btn task-actions__btn--delete"
              onClick={handleDeleteTask}
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

        <div className="task__sub">
          <p className="task__body">{task.body}</p>
          <div className="task__info">
            {task.createdAt !== task.updatedAt && (
              <p>Updated at: {format(parseISO(task.updatedAt), 'H:mm:ss dd/MM/yyy')}</p>
            )}
            <p>Created at: {format(parseISO(task.createdAt), 'H:mm:ss dd/MM/yyy')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="go-back">
        <button>
          <Link to={'/'}>
            <AiOutlineArrowLeft />
          </Link>
        </button>
      </div>
      {content}
    </>
  );
};
