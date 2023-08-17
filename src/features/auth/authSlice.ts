import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { axiosInstance } from '../../api/axios-instance';

type UserT = { name: string; email: string };

type InitialAuthStateT = {
  userData: null | UserT;
  isAuth: boolean;
  error: null | Error | string;
};

const initialState = {
  userData: null,
  isAuth: false,
  error: null,
} as InitialAuthStateT;

//Res Types:
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
      const { data } = await axiosInstance.post<RegisterResT>(`/auth/register`, userData);

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
      const { data } = await axiosInstance.post<LoginResT>(`/auth/login`, credentials);
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
    const { data } = await axiosInstance.get<LogoutResT>(`/auth/logout`);
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
    const { data } = await axiosInstance.get<GetUsersDataResT>(`/users/me`);
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
  const { data } = await axiosInstance.get<IsLoggedInResT>(`/auth/is-logged-in`);

  if (data.isLoggedIn) {
    thunkApi.dispatch(getUsersData());
  }

  return data.isLoggedIn;
});

//

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Register
      .addCase(register.fulfilled, () => {
        //state.userData = action.payload.user;
        // state.isAuth = true;
      })
      //Login
      .addCase(login.fulfilled, () => {
        // state.userData = action.payload.user;
        //state.isAuth = true;
      })
      .addCase(login.rejected, (state, action: PayloadAction<{ message: string } | any>) => {
        state.error = action.payload.message;
      })
      //Logout
      .addCase(logout.fulfilled, (state) => {
        state.userData = null;
        state.isAuth = false;
      })
      //isLoggedIn
      .addCase(isLoggedIn.fulfilled, (state, action) => {
        state.isAuth = action.payload;
        // state.userData = action.payload.user;
        // state.isAuth = true;
      })
      //GetUserData
      .addCase(getUsersData.fulfilled, (state, action) => {
        state.userData = action.payload.user;
      });
  },
});

export const authReducer = authSlice.reducer;
