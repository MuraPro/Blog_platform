import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Chip } from '@mui/material';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowBackIos';
import {
  fetchSingleArticle,
  $articleRequestStatus,
  $errorArticleServer,
  $singlePage,
} from '../../store/slices/articleSlice';
import ArticleCard from '../../components/article-card';
import Spinner from '../../components/spinner';
import ErrorMessage from '../../components/error-message';

const SingleArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  const articleRequestStatus = useSelector($articleRequestStatus);
  const errorArticleServer = useSelector($errorArticleServer);
  const singlePage = useSelector($singlePage);

  useEffect(() => {
    dispatch(fetchSingleArticle(slug));
  }, [dispatch, slug]);

  const goBack = () => navigate(-1, { replace: true });

  const article = useSelector((state) => state.articles.singleArticle);
  return (
    <>
      {articleRequestStatus === 'rejected' && <ErrorMessage serverError={errorArticleServer} />}
      {articleRequestStatus === 'pending' && <Spinner />}
      {articleRequestStatus === 'fulfilled' && article && (
        <>
          <ArticleCard article={article} singlePage={singlePage} />
          <Chip
            label="Go back"
            variant="outlined"
            onClick={goBack}
            sx={{ background: 'white', alignSelf: 'flex-start' }}
            icon={<ArrowCircleLeftOutlinedIcon />}
          />
        </>
      )}
    </>
  );
};

export default SingleArticle;
