import './App.scss';
import { Route, Routes } from 'react-router-dom';

import { PrivateRoutes } from './features/auth/PrivateRoutes';
import { HomePage } from './pages/HomePage';
import { TasksList } from './features/tasks/TasksList';
import { SingleTask } from './features/tasks/SingleTask';
import { AuthPage } from './features/auth/AuthPage';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import { Toaster } from 'react-hot-toast';
import { EditTaskForm } from './features/tasks/EditTaskForm';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: '1.8rem',
            color: 'whitesmoke',
            backgroundColor: 'rgba(82, 91, 163, 0.7)',
          },
        }}
      />

      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={'/'} element={<HomePage />}>
            <Route index element={<TasksList />} />

            <Route path={'task'}>
              <Route index element={<div>Add new task form</div>} />
              <Route path={':taskId'} element={<SingleTask />} />
              <Route path={'edit/:taskId'} element={<EditTaskForm />} />
            </Route>
          </Route>
        </Route>

        <Route path={'/auth'} element={<AuthPage />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
