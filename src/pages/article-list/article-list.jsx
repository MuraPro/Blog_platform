import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@mui/material';
import {
  fetchGetArticles,
  $articles,
  $articlesCount,
  $articleRequestStatus,
  $errorArticleServer,
  //   $deletedArticleSlug,
  clearArticleRequestStatus,
} from '../../store/slices/articleSlice';
import { $offset, setOffset } from '../../store/slices/userSlice';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import classes from './article-list.module.css';
import ErrorIndicator from '../../components/error-indicator/error-indicator';

function ArticleList() {
  const dispatch = useDispatch();
  const articles = useSelector($articles);
  const articlesCount = useSelector($articlesCount);
  const articleRequestStatus = useSelector($articleRequestStatus);
  const errorArticleServer = useSelector($errorArticleServer);
  const offset = useSelector($offset);

  useEffect(() => {
    dispatch(fetchGetArticles({ limit: 3, offset }));
    dispatch(clearArticleRequestStatus());
  }, [dispatch, offset]);

  return (
    <>
      {articleRequestStatus === 'rejected' && errorArticleServer && <ErrorIndicator />}
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
