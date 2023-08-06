import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@mui/material';
import { fetchGetArticles } from '../../store/slices/articleSlice';
import { setOffset } from '../../store/slices/userSlice';
import * as selector from '../../store/selectors/selectors';
import Spinner from '../../components/spinner';
import ErrorMessage from '../../components/error-message';
import ArticleCard from '../../components/article-card';
import classes from './article-list.module.css';

function ArticleList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const articles = useSelector(selector.articles);
  const articlesCount = useSelector(selector.articlesCount);
  const articleRequestStatus = useSelector(selector.articleRequestStatus);
  const errorArticleServer = useSelector(selector.errorArticleServer);
  const offset = useSelector(selector.offset);

  useEffect(() => {
    dispatch(fetchGetArticles({ limit: 5, offset }));
  }, [offset, state, dispatch]);

  useEffect(() => {
    dispatch(fetchGetArticles({ limit: 5, offset }));
  }, []);

  return (
    <>
      {articleRequestStatus === 'rejected' && <ErrorMessage serverError={errorArticleServer} />}
      {articleRequestStatus === 'pending' && <Spinner />}
      {articleRequestStatus === 'fulfilled' && (
        <ul className={classes.list}>
          {articles.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      )}
      {articleRequestStatus === 'fulfilled' && (
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
      )}
    </>
  );
}

export default ArticleList;
