import React from 'react';
import {
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ArticleList from '../../pages/article-list';
import SingleArticle from '../../pages/single-article/single-artical';
import SignIn from '../../pages/sign-in';
import SignUp from '../../pages/sign-up/sign-up';
import Layout from '../layout';
import NotFound from '../../pages/not-found';
import ErrorIndicator from '../error-indicator';
import RequireAuth from '../../hoc';
import EditProfile from '../../pages/edit-profile';
import CreateArticle from '../../pages/create-article';
import EditArticle from '../../pages/edit-article';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="articles" replace />} />
      <Route path="articles" element={<ArticleList />} />
      <Route path="articles/:slug" element={<SingleArticle />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route
        path="profile"
        element={
          <RequireAuth>
            <EditProfile />
          </RequireAuth>
        }
      />
      <Route
        path="new-article"
        element={
          <RequireAuth>
            <CreateArticle />
          </RequireAuth>
        }
      />
      <Route
        path="articles/:slug/edit"
        element={
          <RequireAuth>
            <EditArticle />
          </RequireAuth>
        }
      />
      <Route path="error" element={<ErrorIndicator />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
