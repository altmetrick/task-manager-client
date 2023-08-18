import './TasksFilter.scss';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { TasksFilterT } from '../../types';
import {
  changeFilter,
  selectActiveTasksNumber,
  selectAllTasksNumber,
  selectCompletedTasksNumber,
  selectCurrentFilter,
} from './tasksSlice';

export const TasksFilter = () => {
  const dispatch = useAppDispatch();

  const currentFilter = useAppSelector(selectCurrentFilter);

  const allTasksNum = useAppSelector(selectAllTasksNumber);
  const completedTasksNum = useAppSelector(selectCompletedTasksNumber);
  const completedActiveNum = useAppSelector(selectActiveTasksNumber);

  const handleChangeFilter = (filter: TasksFilterT) => {
    dispatch(changeFilter(filter));
  };

  const options = [
    { status: 'all', amount: allTasksNum },
    { status: 'completed', amount: completedTasksNum },
    { status: 'active', amount: completedActiveNum },
  ];

  const renderedOptions = options.map((option) => (
    <div
      key={option.status}
      className={`option  ${option.status === currentFilter && 'option--active'}`}
      //@ts-ignore
      onClick={() => handleChangeFilter(option.status)}
    >
      <span className="option__status">{option.status}</span>{' '}
      <span className="option__amount">{option.amount}</span>
    </div>
  ));

  return <div className="tasks-filter">{renderedOptions}</div>;
};
