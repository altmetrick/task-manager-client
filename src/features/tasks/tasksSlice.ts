import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { TaskT } from '../../types';
import axios, { AxiosError } from 'axios';
import { RootState } from '../../store/store';

type InitialTasksStateT = {
  tasksEntities: TaskT[] | null;
  status: 'idle' | 'loading' | 'success';
  error: null | Error | string;
};

const initialState = {
  tasksEntities: [],
  status: 'idle',
  error: null,
} as InitialTasksStateT;

//Res Types
type fetchTasksResT = {
  tasks: TaskT[];
};

//Thunks Creators:
export const fetchTasks = createAsyncThunk('tasks/Fetch', async (_, thunkApi) => {
  try {
    const { data } = await axios.get<fetchTasksResT>('api/tasks');

    return data;
  } catch (err) {
    const error: AxiosError<any> = err as any;
    if (error.response) {
      return thunkApi.rejectWithValue(error.response.data);
    }
    throw err;
  }
});

//

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //FetchTasks
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasksEntities = action.payload.tasks;
      });
  },
});

//Selectors:
const selectAllTasks = (state: RootState) => state.tasks.tasksEntities;

export const selectAllTasksSorted = createSelector(selectAllTasks, (tasksEntities) => {
  if (tasksEntities === null) return null;
  console.log('select sorted tasks');
  return [...tasksEntities].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
});

export const tasksReducer = tasksSlice.reducer;
