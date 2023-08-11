import './SingleTask.scss';
import { AiFillDelete, AiFillEdit, AiFillCheckCircle, AiOutlineArrowLeft } from 'react-icons/ai';

const task = {
  _id: '64cd0eedd564aa7fcc938a57',
  title: 'Sent posntcard',
  body: 'lorem lkjalskdjfalksjdfl kjjalksjdfk ,aslkdjf a=alskdjflk ajsldfkj lkasdf ',
  completed: true,
  userId: '64c699c2dcb5d666616d196d',
  createdAt: '2023-08-04T14:45:01.227Z',
  updatedAt: '2023-08-04T14:45:01.227Z',
  __v: 0,
};

export const SingleTask = () => {
  //const { taskId } = useParams();

  return (
    <>
      <div className="go-back">
        <button>
          <AiOutlineArrowLeft />
        </button>
      </div>
      <div className="task">
        <div className="task__main">
          <h2 className="task__title">{task.title}</h2>

          <div className="task-actions">
            <button className="task-actions__btn task-actions__btn--edit">
              <AiFillEdit className="icon" />
            </button>
            <button className="task-actions__btn task-actions__btn--delete">
              <AiFillDelete className="icon" />
            </button>

            <button
              className={`task-actions__btn  ${task.completed && 'task-actions__btn--completed'}`}
            >
              <AiFillCheckCircle className="icon" />
            </button>
          </div>
        </div>

        <div className="task__sub">
          <p className="task__body">{task.body}</p>
          <div className="task__info">Created at: 09 13 2023</div>
        </div>
      </div>
    </>
  );
};
