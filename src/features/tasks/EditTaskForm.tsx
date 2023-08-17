import './EditTaskForm.scss';

import { ChangeEvent, FormEvent, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectTaskById, updateTask } from './tasksSlice';
import toast from 'react-hot-toast';

export const EditTaskForm = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const task = useAppSelector(selectTaskById(taskId));

  const [title, setTitle] = useState(task?.title);
  const [body, setBody] = useState(task?.body);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value);

  const goBack = () => {
    navigate(-1);
  };

  const handleUpdateTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      //@ts-ignore
      const { message } = await dispatch(updateTask({ _id: taskId, title, body })).unwrap();

      toast.success(message);
      goBack();
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const canSave = title?.trim() !== task?.title || body?.trim() !== task?.body;

  return (
    <>
      <div className="go-back">
        <button onClick={goBack}>
          <AiOutlineArrowLeft />
        </button>
      </div>

      <div>
        <h2>Edit task</h2>
        <form className="edit-task-form" onSubmit={handleUpdateTask}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              className="edit-task-form__title"
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>

          <div>
            <label htmlFor="body">Body</label>
            <textarea
              className="edit-task-form__body"
              id="body"
              rows={6}
              value={body}
              onChange={handleBodyChange}
            />
          </div>
          <div className="flex">
            <button className="btn btn--action" disabled={!canSave}>
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
