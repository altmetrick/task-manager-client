import './TaskList.scss';
import { TaskExcerpt } from './TaskExcerpt';

const tasks = [
  {
    _id: '64ca79771fcbc3a0f5f150a8',
    title: 'Hello world1',
    body: 'lorem lkjalskdjfalksjdfl kjjalksjdfk ,aslkdjf a=alskdjflk ajsldfkj lkasdf ',
    completed: true,
    userId: '64c699c2dcb5d666616d196d',
    createdAt: '2023-08-02T15:42:47.229Z',
    updatedAt: '2023-08-04T10:46:22.522Z',
    __v: 0,
  },
  {
    _id: '64cbc7e629fe81586aa815ce',
    title: 'Walk dog and cat',
    body: 'lorem lkjalskdjfalksjdfl kjjalksjdfk ,aslkdjf a=alskdjflk ajsldfkj lkasdf lkjalkjalksjd lkjaskld jalskjd k',
    completed: true,
    userId: '64c699c2dcb5d666616d196d',
    createdAt: '2023-08-03T15:29:42.778Z',
    updatedAt: '2023-08-04T14:44:33.599Z',
    __v: 0,
  },
  {
    _id: '64cbc7f929fe81586aa815d0',
    title: 'Create new project',
    body: 'lorem lkjalskdjfalksjdfl kjjalksjdfk ,aslkdjf a=alskdjflk ajsldfkj lkasdf kjlkajslkdjf lkjaslkdjf lkasj',
    completed: true,
    userId: '64c699c2dcb5d666616d196d',
    createdAt: '2023-08-03T15:30:01.131Z',
    updatedAt: '2023-08-06T15:24:31.155Z',
    __v: 0,
  },
  {
    _id: '64cbcdada988143bf1d203b2',
    title: 'Handle navigation on registration',
    body: 'lorem lkjalskdjfalksjdfl kjjalksjdfk ,aslkdjf a=alskdjflk ajsldfkj lkasdf ljaljsldk fjalksjd lkajslk djf',
    completed: true,
    userId: '64c699c2dcb5d666616d196d',
    createdAt: '2023-08-03T15:54:21.459Z',
    updatedAt: '2023-08-06T15:24:30.059Z',
    __v: 0,
  },
  {
    _id: '64cc8dc748eafa6fdd4de83b',
    title: 'Como astas',
    body: 'lorem lkjalskdjfalksjdfl kjjalksjdfk ,aslkdjf a=alskdjflk ajsldfkj lkasdf lkjaslkdj lkajsl kfjaslk jd ',
    completed: true,
    userId: '64c699c2dcb5d666616d196d',
    createdAt: '2023-08-04T05:33:59.115Z',
    updatedAt: '2023-08-04T11:55:00.927Z',
    __v: 0,
  },
  {
    _id: '64cd0eedd564aa7fcc938a57',
    title: 'Sent posntcard',
    body: 'lorem lkjalskdjfalksjdfl kjjalksjdfk ,aslkdjf a=alskdjflk ajsldfkj lkasdf ',
    completed: false,
    userId: '64c699c2dcb5d666616d196d',
    createdAt: '2023-08-04T14:45:01.227Z',
    updatedAt: '2023-08-04T14:45:01.227Z',
    __v: 0,
  },
];

export const TasksList = () => {
  const renderedTaskExcerpts = tasks.map((task) => <TaskExcerpt task={task} key={task._id} />);

  return <div className="task-list">{renderedTaskExcerpts}</div>;
};
