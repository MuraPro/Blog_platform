import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getCookie from '../../utilites/getCookie';

export const fetchGetArticles = createAsyncThunk(
  'articles/fetchGetArticles',
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`https://blog.kata.academy/api/articles`, {
        params: {
          limit,
          offset,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { articles, articlesCount } = res.data;

      return { articles, articlesCount };
    } catch (err) {
      return rejectWithValue({
        status: `error code is ${err.response.status}`,
        statusText: err?.response?.data?.errors,
      });
    }
  },
);

export const fetchSingleArticle = createAsyncThunk(
  'articles/fetchSingleArticle',
  async (slug, { rejectWithValue }) =>
    axios
      .get(`https://blog.kata.academy/api/articles/${slug}`)
      .then((res) => res.data)
      .catch((err) => {
        rejectWithValue({
          status: `error code is ${err.response.status}`,
          statusText: err?.response?.data?.errors,
        });
      }),
);

export const fetchCreateArticle = createAsyncThunk(
  'articles/fetchCreateArticle',
  async ({ title, description, body, tagList }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
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
            Authorization: `Bearer ${getCookie('token')}`,
          },
        },
      );

      const { article } = res.data;

      return { article };
    } catch (err) {
      return rejectWithValue({
        status: `error code is ${err.response.status}`,
        statusText: err?.response?.data?.errors,
      });
    }
  },
);

export const fetchEditArticle = createAsyncThunk(
  'articles/fetchEditArticle',
  async ({ slug, title, description, body, tagList }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
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
            Authorization: `Bearer ${getCookie('token')}`,
          },
        },
      );

      const { article } = res.data;

      return { article };
    } catch (err) {
      return rejectWithValue({
        status: `error code is ${err.response.status}`,
        statusText: err?.response?.data?.errors,
      });
    }
  },
);

export const fetchDeleteArticle = createAsyncThunk(
  'articles/fetchDeleteArticle',

  async ({ slug, redirectToList }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`https://blog.kata.academy/api/articles/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });

      const { article } = res.data;
      redirectToList();
      return { slug, article };
    } catch (err) {
      return rejectWithValue({
        status: `error code is ${err.response.status}`,
        statusText: err?.response?.data?.errors,
      });
    }
  },
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
            Authorization: `Bearer ${getCookie('token')}`,
          },
        },
      )
      .then((res) => res.data)
      .catch((err) => {
        rejectWithValue({
          status: `error code is ${err.response.status}`,
          statusText: err?.response?.data?.errors,
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
          Authorization: `Bearer ${getCookie('token')}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        rejectWithValue({
          status: `error code is ${err.response.status}`,
          statusText: err?.response?.data?.errors,
        });
      }),
);

/* eslint-disable no-param-reassign */
const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    deletedArticleSlug: '',
    singleArticle: null,
    articlesCount: null,
    articleRequestStatus: '',
    errorArticleServer: null,
    articleIsCreated: false,
    articleIsGeted: false,
    articleIsDeleted: false,
    singlePage: false,
  },
  reducers: {
    clearArticleRequestStatus(state) {
      state.articleRequestStatus = '';
    },
    clearSingleArticles(state) {
      state.singleArticle = null;
    },
    clearErrorArticleServer(state) {
      state.errorArticleServer = null;
    },
    setArticleIsCreated(state) {
      state.articleIsCreated = false;
    },
    setArticleIsDeleted(state) {
      state.articleIsDeleted = false;
    },
    clearArticles(state) {
      state.articles = [];
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
      })
      .addCase(fetchDeleteArticle.pending, (state) => {
        state.articleRequestStatus = 'pending';
        state.errorArticleServer = null;
        state.articleIsDeleted = false;
      })
      .addCase(fetchSetFavoriteArticle.pending, () => {})
      .addCase(fetchDeleteFavoriteArticle.pending, () => {})
      .addCase(fetchGetArticles.fulfilled, (state, action) => {
        state.articles = [...action.payload.articles];
        state.articlesCount = action.payload.articlesCount;
        state.deletedArticleSlug = '';
        state.articleRequestStatus = 'fulfilled';
        state.singlePage = false;
      })
      .addCase(fetchSingleArticle.fulfilled, (state, action) => {
        state.singleArticle = { ...action.payload.article };
        state.articleRequestStatus = 'fulfilled';
        state.singlePage = true;
      })
      .addCase(fetchCreateArticle.fulfilled, (state, action) => {
        state.singleArticle = { ...action.payload.article };
        state.articleRequestStatus = 'fulfilled';
        state.articleIsCreated = true;
        state.singlePage = true;
      })
      .addCase(fetchEditArticle.fulfilled, (state, action) => {
        state.singleArticle = { ...action.payload.article };
        state.articleRequestStatus = 'fulfilled';
        state.articleIsCreated = true;
        state.singlePage = false;
      })
      .addCase(fetchDeleteArticle.fulfilled, (state, action) => {
        state.articleRequestStatus = 'fulfilled';
        state.deletedArticleSlug = action.payload.slug;
        state.articleIsDeleted = true;
        state.singleArticle = null;
        state.singlePage = false;
      })
      .addCase(fetchSetFavoriteArticle.fulfilled, () => {})
      .addCase(fetchDeleteFavoriteArticle.fulfilled, () => {})
      .addCase(fetchGetArticles.rejected, (state, action) => {
        state.errorArticleServer = action.payload.statusText;
        state.articleRequestStatus = 'rejected';
      })
      .addCase(fetchSingleArticle.rejected, (state, action) => {
        state.errorArticleServer = action.payload;
        state.articleRequestStatus = 'rejected';
      })
      .addCase(fetchCreateArticle.rejected, (state, action) => {
        state.errorArticleServer = action.payload;
        state.articleRequestStatus = 'rejected';
        state.articleIsCreated = false;
      })
      .addCase(fetchEditArticle.rejected, (state, action) => {
        state.errorArticleServer = action.payload;
        state.articleRequestStatus = 'rejected';
        state.articleIsCreated = false;
      })
      .addCase(fetchDeleteArticle.rejected, (state, action) => {
        state.errorArticleServer = action.payload;
        state.articleRequestStatus = 'rejected';
        state.articleIsDeleted = false;
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

export const $articles = (state) => state.articles.articles;
export const $articlesCount = (state) => state.articles.articlesCount;
export const $articleRequestStatus = (state) => state.articles.articleRequestStatus;
export const $errorArticleServer = (state) => state.articles.errorArticleServer;
export const $singlePage = (state) => state.articles.singlePage;
export const $singleArticle = (state) => state.articles.singleArticle;
export const $articleIsCreated = (state) => state.articles.articleIsCreated;
export const $articleIsDeleted = (state) => state.articles.articleIsDeleted;
export const $deletedArticleSlug = (state) => state.articles.deletedArticleSlug;

// eslint-disable-next-line no-empty-pattern
const {
  clearArticleRequestStatus,
  clearSingleArticles,
  clearErrorArticleServer,
  setArticleIsCreated,
  setArticleIsDeleted,
  clearArticles,
} = articleSlice.actions;

export {
  clearArticleRequestStatus,
  clearSingleArticles,
  clearErrorArticleServer,
  setArticleIsCreated,
  setArticleIsDeleted,
  clearArticles,
};

export default articleSlice.reducer;
