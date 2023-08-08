import './TaskExcerpt.scss';
import { TaskT } from '../../types';
import { useNavigate } from 'react-router-dom';

type PropsT = {
  task: TaskT;
};

export const TaskExcerpt: React.FunctionComponent<PropsT> = ({ task }) => {
  const navigate = useNavigate();

  const handleShowFullTask = () => {
    navigate(`task/${task._id}`);
  };

  return (
    <div className="task-excerpt">
      <div className="task-actions">
        <div className="task-actions__completed"></div>
        <div className="task-actions__buttons"></div>
      </div>
      <h3 className="task-excerpt__title">{task.title}</h3>

      <div className="task-excerpt__sub" onClick={handleShowFullTask}>
        <p>{task.body.substring(0, 60)}...</p>
      </div>
    </div>
  );
};
