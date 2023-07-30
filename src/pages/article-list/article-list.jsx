import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@mui/material';
import { fetchGetArticles } from '../../store/slices/articleSlice';
import { logOut, setOffset } from '../../store/slices/userSlice';
import * as selector from '../../store/selectors/selectors';
import Spinner from '../../components/spinner';
import ErrorMessage from '../../components/error-message';
import ArticleCard from '../../components/article-card';
import classes from './article-list.module.css';

function ArticleList() {
  const dispatch = useDispatch();

  const articles = useSelector(selector.articles);
  const articlesCount = useSelector(selector.articlesCount);
  const articleRequestStatus = useSelector(selector.articleRequestStatus);
  const errorArticleServer = useSelector(selector.errorArticleServer);
  const offset = useSelector(selector.offset);

  useEffect(() => {
    dispatch(fetchGetArticles({ limit: 3, offset }));
  }, [dispatch, offset]);

  useEffect(() => () => logOut(), []);

  const error =
    articleRequestStatus === 'rejected' ? <ErrorMessage serverError={errorArticleServer} /> : null;
  const spinner = articleRequestStatus === 'pending' ? <Spinner /> : null;
  const content =
    articleRequestStatus === 'fulfilled' ? (
      <>
        <ul className={classes.list}>
          {articles.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
        <div className={classes.section_pagination}>
          <Pagination
            count={Math.ceil(articlesCount / 5)}
            page={offset / 5 + 1}
            shape="rounded"
            onChange={(_, num) => {
              dispatch(setOffset((num - 1) * 5));
            }}
          />
        </div>
      </>
    ) : null;

  return (
    <>
      {error}
      {spinner}
      {content}
    </>
  );
}

export default ArticleList;
