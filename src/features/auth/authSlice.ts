import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

type UserT = { name: string; email: string };

type InitialStateT = {
  userData: null | UserT;
  isAuth: boolean;
  error: null | Error | string;
};

const initialState: InitialStateT = {
  userData: null,
  isAuth: false,
  error: null,
};

//Response Types:
type RegisterResT = { user: UserT; message: string };
type LoginResT = { user: UserT; message: string };
type LogoutResT = { message: string };
type GetUsersDataResT = { user: UserT };
type IsLoggedInResT = { isLoggedIn: boolean };

//Thunk Creators:
export const register = createAsyncThunk(
  'auth/Register',
  async (userData: { name: string; email: string; password: string }, thunkApi) => {
    try {
      const { data } = await axios.post<RegisterResT>('/api/auth/register', userData);

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
export const login = createAsyncThunk(
  'auth/Login',
  async (credentials: { email: string; password: string }, thunkApi) => {
    try {
      const { data } = await axios.post<LoginResT>('/api/auth/login', credentials);
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

export const logout = createAsyncThunk('auth/Logout', async (_, thunkApi) => {
  try {
    const { data } = await axios.get<LogoutResT>('/api/auth/logout');
    return data;
  } catch (err) {
    const error: AxiosError<any> = err as any;
    if (error.response) {
      return thunkApi.rejectWithValue(error.response.data);
    }
    throw err;
  }
});

export const getUsersData = createAsyncThunk('auth/GetUsersData', async (_, thunkApi) => {
  try {
    const { data } = await axios.get<GetUsersDataResT>('/api/users/me');
    return data;
  } catch (err) {
    const error: AxiosError<any> = err as any;
    if (error.response) {
      return thunkApi.rejectWithValue(error.response.data);
    }
    throw err;
  }
});

export const isLoggedIn = createAsyncThunk('auth/isLoggedIn', async (_, thunkApi) => {
  const { data } = await axios.get<IsLoggedInResT>('/api/auth/is-logged-in');

  if (data.isLoggedIn) {
    thunkApi.dispatch(getUsersData());
  }

  return data.isLoggedIn;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Register
      .addCase(register.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuth = true;
      })
      //Login
      .addCase(login.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, action: PayloadAction<{ message: string } | any>) => {
        state.error = action.payload.message;
      })
      //Logout
      .addCase(logout.fulfilled, (state) => {
        state.userData = null;
        state.isAuth = false;
      })
      //GetUserData
      .addCase(getUsersData.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuth = true;
      })
      //isLoggedIn
      .addCase(isLoggedIn.fulfilled, () => {
        // state.userData = action.payload.user;
        // state.isAuth = true;
      });
  },
});

export const authReducer = authSlice.reducer;
