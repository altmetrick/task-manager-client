import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { TaskT, TaskUpdateDataT, TasksFilterT } from '../../types';
import { AxiosError } from 'axios';
import { RootState } from '../../store/store';
import { pauseSuccess } from '../../utils/pause';
import { axiosInstance } from '../../api/axios-instance';

type InitialTasksStateT = {
  tasksEntities: TaskT[] | null;
  status: 'idle' | 'loading' | 'success';
  filter: TasksFilterT;
  error: null | Error | string;
};

const initialState = {
  tasksEntities: [],
  status: 'idle',
  error: null,
  filter: 'all',
} as InitialTasksStateT;

//Res Types
type fetchTasksResT = {
  tasks: TaskT[];
};
type CreateTaskResT = {
  task: TaskT;
  message: string;
};
type DeleteTaskResT = {
  task: TaskT;
  message: string;
};
type UpdateTaskResT = {
  task: TaskT;
  message: string;
};
//Thunks Creators:

export const fetchTasks = createAsyncThunk('tasks/Fetch', async (_, thunkApi) => {
  try {
    const { data } = await axiosInstance.get<fetchTasksResT>(`/tasks`);

    //DEV ONLY!!!
    const res = await pauseSuccess(0.5);
    console.log(res);

    return data;
  } catch (err) {
    const error: AxiosError<any> = err as any;
    if (error.response) {
      return thunkApi.rejectWithValue(error.response.data);
    }
    throw err;
  }
});
export const createTask = createAsyncThunk(
  'tasks/Create',
  async (taskData: { title: string; body: string }, thunkApi) => {
    try {
      const { data } = await axiosInstance.post<CreateTaskResT>('/tasks', taskData);

      return data;
    } catch (err) {
      const error: AxiosError<any> = err as any;
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }
      throw err;
    }
  }
);
export const deleteTask = createAsyncThunk('tasks/Delete', async (id: string, thunkApi) => {
  try {
    const { data } = await axiosInstance.delete<DeleteTaskResT>(`/tasks/${id}`);
    return data;
  } catch (err) {
    const error: AxiosError<any> = err as any;
    if (error.response) {
      return thunkApi.rejectWithValue(error.response.data);
    }
    throw err;
  }
});
export const updateTask = createAsyncThunk(
  'tasks/Update',
  async (taskData: TaskUpdateDataT, thunkApi) => {
    const { _id } = taskData;

    try {
      const { data } = await axiosInstance.patch<UpdateTaskResT>(`/tasks/${_id}`, taskData);

      return data;
    } catch (err) {
      const error: AxiosError<any> = err as any;
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }
      throw err;
    }
  }
);

//Slice

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //FetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasksEntities = action.payload.tasks;
        state.status = 'success';
      })
      //CreateTask
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasksEntities?.push(action.payload.task);
      })
      //DeleteTask
      .addCase(deleteTask.fulfilled, (state, action) => {
        if (state.tasksEntities) {
          state.tasksEntities = state.tasksEntities?.filter(
            (task) => task._id !== action.payload.task._id
          );
        }
      })
      //Update Task (toggle completed, and update title or body)
      .addCase(updateTask.fulfilled, (state, action) => {
        if (state.tasksEntities === null) return;
        //filter out old task that was updated, and add new one that we get from the server
        const newTasks = state.tasksEntities?.filter(
          (task) => task._id !== action.payload.task._id
        );

        state.tasksEntities = [...newTasks, action.payload.task];
      });
  },
});

//Selectors:

const selectAllTasks = (state: RootState) => state.tasks.tasksEntities;
export const selectCurrentFilter = (state: RootState) => state.tasks.filter;
export const selectTaskById = (taskId?: string) => {
  return (state: RootState) => state.tasks.tasksEntities?.find((task) => task._id === taskId);
};

export const selectAllTasksNumber = (state: RootState) => state.tasks.tasksEntities?.length;
export const selectCompletedTasksNumber = (state: RootState) =>
  state.tasks.tasksEntities?.filter((task) => task.completed).length;
export const selectActiveTasksNumber = (state: RootState) =>
  state.tasks.tasksEntities?.filter((task) => !task.completed).length;

export const selectAllTasksSorted = createSelector([selectAllTasks], (tasksEntities) => {
  if (tasksEntities === null) return [];
  console.log('select sorted tasks');
  return [...tasksEntities].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
});

export const selectTasksByFilter = createSelector(
  [selectAllTasksSorted, selectCurrentFilter],

  (tasks: TaskT[], filter: TasksFilterT) => {
    const showAllTasks = filter === 'all';
    const showCompletedTasks = filter === 'completed';
    const showActiveTasks = filter === 'active';

    return tasks.filter((task) => {
      if (showAllTasks) return task;
      if (showCompletedTasks) return task.completed;
      if (showActiveTasks) return !task.completed;
    });
  }
);

//Actions
export const { changeFilter } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
