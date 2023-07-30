/* eslint-disable */
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
        console.log('err.response', err.response);
        return rejectWithValue({
          status: err.response.status,
          statusText: err?.response?.data?.errors?.message || 'Логин или пароль не верные',
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
          status: err.response.status,
          statusText:
            err?.response?.data?.errors?.message || 'Не верные данные. Проверьте заполнение полей!',
        });
      });
  },
);

export const fetchUpdateUserProfile = createAsyncThunk(
  'user/fetchUpdateUserProfile',
  // eslint-disable-next-line no-unused-vars
  async ({ userName: username, email, password, avatarUrl: image }, { _, rejectWithValue }) => {
    console.log('Incoming data', username, email, password, image);
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
            Authorization: `Token ${getCookie('token')}`,
          },
        },
      )
      .then((res) => res.data)
      .catch((err) => {
        return rejectWithValue({
          status: err.response.status,
          statusText:
            err?.response?.data?.errors?.message ||
            'Данные не изменились. Такой пользователь уже существует!',
        });
      });
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    bio: '',
    image: '',
    offset: 0,
    userRequestStatus: null,
    errorUserServer: null,
    userIsEdit: false,
  },
  reducers: {
    logOut(state) {
      deleteCookie('token');
      state.username = '';
      state.email = '';
      state.bio = '';
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
        state.bio = action.payload.user.bio;
        state.image = action.payload.user.image;
        document.cookie = `token = ${action.payload.user.token}`;
        state.userIsEdit = true;
      })
      .addCase(fetchCreateUser.fulfilled, (state) => {
        state.userRequestStatus = 'fulfilled';
        state.userIsEdit = true;
      })
      .addCase(fetchUpdateUserProfile.fulfilled, (state, action) => {
        state.username = action.payload.user.username;
        state.email = action.payload.user.email;
        state.bio = action.payload.user.bio;
        state.image = action.payload.user.image;
        state.userRequestStatus = 'fulfilled';
        state.userIsEdit = true;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        console.log('User not logged in, error!!!', action.payload);
        state.errorUserServer = action.payload;
        state.userRequestStatus = 'rejected';
      })
      .addCase(fetchCreateUser.rejected, (state, action) => {
        console.log('User not created, error!!!', action.payload);
        state.errorUserServer = action.payload;
        state.userRequestStatus = 'rejected';
        state.userIsEdit = false;
      })
      .addCase(fetchUpdateUserProfile.rejected, (state, action) => {
        console.log('User not updated, error!!!', action.payload);
        state.errorUserServer = action.payload;
        state.userRequestStatus = 'rejected';
        state.userIsEdit = false;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const { logOut, setUserIsNotEdit, resetUserError, setOffset } = userSlice.actions;

export default userSlice.reducer;
