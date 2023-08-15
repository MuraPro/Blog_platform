/* eslint-disable no-param-reassign,arrow-body-style */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import deleteCookie from '../../utilites/deleteCookie';
import getCookie from '../../utilites/getCookie';

export const fetchLoginUser = createAsyncThunk(
  'user/fetchLoginUser',
  // eslint-disable-next-line no-unused-vars
  async ({ email, password }, { _, rejectWithValue }) => {
    return axios
      .post(
        `https://blog.kata.academy/api/users/login`,
        {
          user: {
            email,
            password,
          },
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .then((res) => res.data)
      .catch((err) => {
        return rejectWithValue({
          status: `error code is ${err.response.status}`,
          statusText: err?.response?.data?.errors,
        });
      });
  },
);

export const fetchCreateUser = createAsyncThunk(
  'user/fetchCreateUser',
  // eslint-disable-next-line no-unused-vars
  async ({ userName: username, email, password }, { _, rejectWithValue }) => {
    return axios
      .post(
        `https://blog.kata.academy/api/users`,
        {
          user: {
            username,
            email,
            password,
          },
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .then((res) => res.data)
      .catch((err) => {
        return rejectWithValue({
          status: `error code is ${err.response.status}`,
          statusText: err?.response?.data?.errors,
        });
      });
  },
);

export const fetchUpdateUserProfile = createAsyncThunk(
  'user/fetchUpdateUserProfile',
  // eslint-disable-next-line no-unused-vars
  async ({ userName: username, email, password, avatarUrl: image }, { _, rejectWithValue }) => {
    return axios
      .put(
        `https://blog.kata.academy/api/user`,
        {
          user: {
            username,
            email,
            password,
            image,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('token')}`,
          },
        },
      )
      .then((res) => res.data)
      .catch((err) => {
        return rejectWithValue({
          status: err.response.status,
          statusText: err?.response?.data?.errors,
        });
      });
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    image: '',
    offset: 0,
    userRequestStatus: null,
    errorUserServer: null,
    userIsEdit: false,
    isLogged: null,
  },
  reducers: {
    logOut(state) {
      deleteCookie('token');
      sessionStorage.removeItem('auth');
      state.username = '';
      state.email = '';
      state.image = '';
      state.userRequestStatus = '';
      state.offset = 0;
    },
    setUserIsNotEdit(state) {
      state.userIsEdit = false;
    },
    resetUserError(state) {
      state.errorUserServer = null;
    },
    setOffset(state, action) {
      state.offset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUser.pending, (state) => {
        state.userRequestStatus = 'pending';
        state.errorUserServer = null;
        state.userIsEdit = false;
      })
      .addCase(fetchCreateUser.pending, (state) => {
        state.userRequestStatus = 'pending';
        state.errorUserServer = null;
        state.userIsEdit = false;
      })
      .addCase(fetchUpdateUserProfile.pending, (state) => {
        state.userRequestStatus = 'pending';
        state.errorUserServer = null;
        state.userIsEdit = false;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.userRequestStatus = 'fulfilled';
        state.username = action.payload.user.username;
        state.email = action.payload.user.email;
        state.image = action.payload.user.image;
        document.cookie = `token = ${action.payload.user.token}`;
        sessionStorage.setItem('auth', action.payload.user.token);
        state.userIsEdit = true;
      })
      .addCase(fetchCreateUser.fulfilled, (state) => {
        state.userRequestStatus = 'fulfilled';
        state.userIsEdit = true;
      })
      .addCase(fetchUpdateUserProfile.fulfilled, (state, action) => {
        state.userRequestStatus = 'fulfilled';
        state.username = action.payload.user.username;
        state.email = action.payload.user.email;
        state.password = action.payload.user.password;
        state.image = action.payload.user.image;
        state.userIsEdit = true;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.errorUserServer = action.payload;
        state.userRequestStatus = 'rejected';
      })
      .addCase(fetchCreateUser.rejected, (state, action) => {
        state.errorUserServer = action.payload;
        state.userRequestStatus = 'rejected';
        state.userIsEdit = false;
      })
      .addCase(fetchUpdateUserProfile.rejected, (state, action) => {
        state.errorUserServer = action.payload;
        state.userRequestStatus = 'rejected';
        state.userIsEdit = false;
      });
  },
});

export const $offset = (state) => state.user.offset;
export const $userName = (state) => state.user.username;
export const $auth = (state) => state.user.email;
export const $userAvatar = (state) => state.user.image;
export const $userLoggedIn = (state) => state.user.username;
export const $user = (state) => state.user;
export const $userRequestStatus = (state) => state.user.userRequestStatus;
export const $errorUserServer = (state) => state.user.errorUserServer;
export const $userIsEdit = (state) => state.user.userIsEdit;

// eslint-disable-next-line no-empty-pattern
export const { logOut, setUserIsNotEdit, resetUserError, setOffset } = userSlice.actions;

export default userSlice.reducer;
