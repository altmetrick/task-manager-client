import {
  // PayloadAction,
  // SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

type UserT = { name: string; email: string };

type InitialStateT = {
  userData: null | UserT;
  isAuth: boolean;
};

const initialState: InitialStateT = {
  userData: null,
  isAuth: false,
};

//Thunk Creators:
export const register = createAsyncThunk(
  'auth/Register',
  async (userData: { name: string; email: string; password: string }) => {
    const { data } = await axios.post('/api/auth/register', userData);
    return data;
  }
);
export const login = createAsyncThunk(
  'auth/Login',
  async (credentials: { email: string; password: string }) => {
    const { data } = await axios.post('/api/auth/login', credentials);
    return data;
  }
);

export const logout = createAsyncThunk('auth/Logout', async () => {
  const { data } = await axios.get('/api/auth/logout');
  return data;
});

export const getUsersData = createAsyncThunk('auth/GetUsersData', async () => {
  const { data } = await axios.get('/api/users/me');

  return data;
});

export const isLoggedIn = createAsyncThunk('auth/isLoggedIn', async (_, thunkApi) => {
  const { data } = await axios.get('/api/auth/is-logged-in');

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
        state.userData = action.payload.data;
        state.isAuth = true;
      })
      //Login
      .addCase(login.fulfilled, (state, action) => {
        state.userData = action.payload.data;
        state.isAuth = true;
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
