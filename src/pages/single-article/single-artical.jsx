import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Chip } from '@mui/material';
import { toast } from 'react-toastify';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowBackIos';
import {
  fetchSingleArticle,
  $errorArticleServer,
  $articleRequestStatus,
  $singleArticle,
  $singlePage,
  clearErrorArticleServer,
} from '../../store/slices/articleSlice';
import ArticleCard from '../../components/article-card';
import Spinner from '../../components/spinner';
import ErrorIndicator from '../../components/error-indicator/error-indicator';

const SingleArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  const errorArticleServer = useSelector($errorArticleServer);
  const articleRequestStatus = useSelector($articleRequestStatus);
  const singlePage = useSelector($singlePage);
  const article = useSelector($singleArticle);

  useEffect(() => {
    dispatch(fetchSingleArticle(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (errorArticleServer) {
      toast.error('Something went wrong!');
      dispatch(clearErrorArticleServer());
    }
  }, [errorArticleServer]);

  const goBack = () => navigate('/articles', { replace: true });

  return (
    <>
      {articleRequestStatus === 'rejected' && <ErrorIndicator />}
      {articleRequestStatus === 'pending' && <Spinner />}
      {articleRequestStatus === 'fulfilled' && article && (
        <>
          <ArticleCard article={article} singlePage={singlePage} />
          <Chip
            label="Go List"
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
