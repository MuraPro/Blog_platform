/* eslint-disable */
/* eslint-disable no-param-reassign,arrow-body-style,no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getCookie from '../../utilites/getCookie';

export const fetchGetArticles = createAsyncThunk(
  'articles/fetchGetArticles',
  async ({ limit, offset }, { rejectWithValue }) =>
    axios
      .get(`https://blog.kata.academy/api/articles`, {
        params: {
          limit,
          offset,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        return rejectWithValue({
          status: err.response.status,
          statusText: err.response.statusText,
        });
      }),
);
export const fetchSingleArticle = createAsyncThunk(
  'articles/fetchSingleArticle',
  async (slug, { rejectWithValue }) =>
    axios
      .get(`https://blog.kata.academy/api/articles/${slug}`)
      .then((res) => res.data)
      .catch((err) => {
        return rejectWithValue({
          status: err.response.status,
          statusText: err.response.statusText,
        });
      }),
);

export const fetchCreateArticle = createAsyncThunk(
  'articles/fetchCreateArticle',
  async ({ title, description, body, tagList }, { rejectWithValue }) => {
    axios
      .post(
        `https://blog.kata.academy/api/articles`,
        {
          article: {
            title,
            description,
            body,
            tagList,
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
          statusText: err.response.statusText,
        });
      });
  },
);

export const fetchEditArticle = createAsyncThunk(
  'articles/fetchEditArticle',
  async ({ slug, title, description, body, tagList }, { rejectWithValue }) => {
    axios
      .put(
        `https://blog.kata.academy/api/articles/${slug}`,
        {
          article: {
            title,
            description,
            body,
            tagList,
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
        return rejectWithValue(err.message);
      });
  },
);

export const fetchDeleteArticle = createAsyncThunk(
  'articles/fetchDeleteArticle',
  async (slug, { rejectWithValue }) =>
    axios
      .delete(`https://blog.kata.academy/api/articles/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${getCookie('token')}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        return rejectWithValue({
          status: err.response.status,
          statusText: err.response.statusText,
        });
      }),
);

export const fetchSetFavoriteArticle = createAsyncThunk(
  'articles/fetchSetFavoriteArticle',
  async (slug, { rejectWithValue }) =>
    axios
      .post(
        `https://blog.kata.academy/api/articles/${slug}/favorite`,
        {},
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
          statusText: err.response.statusText,
        });
      }),
);

export const fetchDeleteFavoriteArticle = createAsyncThunk(
  'articles/fetchDeleteFavoriteArticle',
  async (slug, { rejectWithValue }) =>
    axios
      .delete(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${getCookie('token')}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        return rejectWithValue({
          status: err.response.status,
          statusText: err.response.statusText,
        });
      }),
);

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    singleArticle: null,
    articlesCount: null,
    articleRequestStatus: '',
    errorArticleServer: null,
    articleIsCreated: false,
    singlePage: false,
  },
  reducers: {
    clearArticleRequestStatus(state) {
      state.articleRequestStatus = '';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGetArticles.pending, (state) => {
        state.articleRequestStatus = 'pending';
        state.errorArticleServer = null;
        state.articleIsCreated = false;
      })
      .addCase(fetchSingleArticle.pending, (state) => {
        state.articleRequestStatus = 'pending';
        state.errorArticleServer = null;
        state.articleIsCreated = false;
      })
      .addCase(fetchCreateArticle.pending, (state) => {
        state.articleRequestStatus = 'pending';
        state.errorArticleServer = null;
        state.articleIsCreated = false;
      })
      .addCase(fetchEditArticle.pending, (state) => {
        state.articleRequestStatus = 'pending';
        state.errorArticleServer = null;
        state.articleIsCreated = false;
      })
      .addCase(fetchDeleteArticle.pending, (state) => {
        state.articleRequestStatus = 'pending';
        state.errorArticleServer = null;
      })
      .addCase(fetchSetFavoriteArticle.pending, (state) => {
        // console.log('Отправка запроса на добавление в избранное');
      })
      .addCase(fetchDeleteFavoriteArticle.pending, (state) => {
        // console.log('Отправка запроса на удаление из избранного');
      })

      .addCase(fetchGetArticles.fulfilled, (state, action) => {
        state.articles = [...action.payload.articles];
        state.articlesCount = action.payload.articlesCount;
        state.articleRequestStatus = 'fulfilled';
        state.singlePage = false;
      })
      .addCase(fetchSingleArticle.fulfilled, (state, action) => {
        state.singleArticle = { ...action.payload.article };
        state.articleRequestStatus = 'fulfilled';
        state.singlePage = true;
      })
      .addCase(fetchCreateArticle.fulfilled, (state) => {
        state.articleRequestStatus = 'fulfilled';
        state.articleIsCreated = true;
        state.singlePage = false;
      })
      .addCase(fetchEditArticle.fulfilled, (state) => {
        state.articleRequestStatus = 'fulfilled';
        state.articleIsCreated = true;
        state.singlePage = false;
      })
      .addCase(fetchDeleteArticle.fulfilled, (state) => {
        state.articleRequestStatus = 'fulfilled';
        state.singlePage = false;
      })
      .addCase(fetchSetFavoriteArticle.fulfilled, () => {
        // console.log('Успешный запрос на добавление в избранное');
      })
      .addCase(fetchDeleteFavoriteArticle.fulfilled, () => {
        // console.log('Успешный запрос на удаление из избранного');
      })
      .addCase(fetchGetArticles.rejected, (state, action) => {
        state.errorArticleServer = action.payload;
        state.articleRequestStatus = 'rejected';
      })
      .addCase(fetchSingleArticle.rejected, (state, action) => {
        state.errorArticleServer = action.payload;
        state.articleRequestStatus = 'rejected';
      })
      .addCase(fetchCreateArticle.rejected, (state, action) => {
        state.errorArticleServer = action.payload;
        state.articleRequestStatus = 'rejected';
      })
      .addCase(fetchEditArticle.rejected, (state, action) => {
        state.errorArticleServer = action.payload;
        state.articleRequestStatus = 'rejected';
      })
      .addCase(fetchDeleteArticle.rejected, (state, action) => {
        state.errorArticleServer = action.payload;
        state.articleRequestStatus = 'rejected';
      })
      .addCase(fetchSetFavoriteArticle.rejected, (state, action) => {
        state.errorArticleServer = action.payload;
        state.articleRequestStatus = 'rejected';
      })
      .addCase(fetchDeleteFavoriteArticle.rejected, (state, action) => {
        state.errorArticleServer = action.payload;
        state.articleRequestStatus = 'rejected';
      });
  },
});

// eslint-disable-next-line no-empty-pattern
const { clearArticleRequestStatus } = articleSlice.actions;

export { clearArticleRequestStatus };

export default articleSlice.reducer;
