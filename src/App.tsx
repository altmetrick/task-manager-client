import './App.scss';
import { Route, Routes } from 'react-router-dom';

import { PrivateRoutes } from './features/auth/PrivateRoutes';
import { HomePage } from './pages/HomePage';
import { TasksList } from './features/tasks/TasksList';
import { SingleTask } from './features/tasks/SingleTask';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={'/'} element={<HomePage />}>
            <Route index element={<TasksList />} />

            <Route path={'task'}>
              <Route index element={<div>Add new task form</div>} />
              <Route path={':taskId'} element={<SingleTask />} />
              <Route path={'edit/:taskId'} element={<div>Edit task form</div>} />
            </Route>
          </Route>
        </Route>

        <Route path={'/auth'} element={<div>Auth</div>} />
      </Routes>
    </>
  );
}

export default App;
