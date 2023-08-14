import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@mui/material';
import {
  fetchGetArticles,
  $articles,
  $articlesCount,
  $articleRequestStatus,
  $errorArticleServer,
} from '../../store/slices/articleSlice';
import { $offset, setOffset } from '../../store/slices/userSlice';
import Spinner from '../../components/spinner';
import ErrorMessage from '../../components/error-message';
import ArticleCard from '../../components/article-card';
import classes from './article-list.module.css';

function ArticleList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;

  const articles = useSelector($articles);
  const articlesCount = useSelector($articlesCount);
  const articleRequestStatus = useSelector($articleRequestStatus);
  const errorArticleServer = useSelector($errorArticleServer);
  const offset = useSelector($offset);

  useEffect(() => {
    dispatch(fetchGetArticles({ limit: 3, offset }));
  }, []);

  useEffect(() => {
    dispatch(fetchGetArticles({ limit: 3, offset }));
  }, [offset, state]);

  return (
    <>
      {articleRequestStatus === 'rejected' && <ErrorMessage serverError={errorArticleServer} />}
      {articleRequestStatus === 'pending' && <Spinner />}
      {articleRequestStatus === 'fulfilled' && (
        <>
          <ul className={classes.list}>
            {articles.map((item) => (
              <li key={item.slug}>
                <ArticleCard article={item} />
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
      )}
    </>
  );
}

export default ArticleList;
