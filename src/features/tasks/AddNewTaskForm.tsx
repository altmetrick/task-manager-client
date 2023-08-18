import './AddNewTaskForm.scss';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { createTask } from './tasksSlice';
import { toast } from 'react-hot-toast';

export const AddNewTaskForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value);

  const handleCreateNewTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const taskData = { title, body };

    try {
      const { message } = await dispatch(createTask(taskData)).unwrap();
      toast.success(message);
      goBack();
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    }
  };

  function goBack() {
    navigate(-1);
    //dispatch()
  }

  const canSave = !title || !body;

  return (
    <div>
      <div>
        <button onClick={goBack}>{'<-'}</button>
      </div>
      <h2>Create New Task</h2>
      <form className="add-new-task-form" onSubmit={handleCreateNewTask}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            className="add-new-task-form__title"
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div>
          <label htmlFor="body">Body</label>
          <textarea
            className="add-new-task-form__body"
            id="body"
            rows={6}
            value={body}
            onChange={handleBodyChange}
          />
        </div>
        <div className="flex">
          <button className="btn btn--action" disabled={canSave}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
