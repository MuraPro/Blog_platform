import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  $singleArticle,
  $articleRequestStatus,
  $errorArticleServer,
  $articleIsCreated,
  $singlePage,
  fetchEditArticle,
  setArticleIsCreated,
  clearErrorArticleServer,
} from '../../store/slices/articleSlice';
import ArticleForm from '../../components/article-form';
import ModalWindow from '../../components/modal-window';
import Spinner from '../../components/spinner';
import ErrorIndicator from '../../components/error-indicator/error-indicator';

const EditArticle = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();

  const article = useSelector($singleArticle);
  const articleRequestStatus = useSelector($articleRequestStatus);
  const errorArticleServer = useSelector($errorArticleServer);
  const singlePage = useSelector($singlePage);
  const articleIsCreated = useSelector($articleIsCreated);

  useEffect(() => {
    if (articleIsCreated) {
      toast.success('Article has edited successfully!');
      navigate(-1, { replace: true });
      dispatch(setArticleIsCreated());
    }
  }, [articleIsCreated]);

  const handlerFormSubmit = ({ title, description, text: body }, tagList) => {
    dispatch(fetchEditArticle({ slug, title, description, body, tagList }));
  };

  useEffect(() => {
    if (errorArticleServer) {
      toast.error('Article has not edited. Something went wrong!');
      dispatch(clearErrorArticleServer());
    }
  }, [errorArticleServer]);

  return (
    <>
      {articleRequestStatus === 'rejected' && errorArticleServer && <ErrorIndicator />}
      {articleRequestStatus === 'pending' && <Spinner />}
      {articleRequestStatus === 'fulfilled' && (
        <>
          {singlePage && <ArticleForm article={article} handlerFormSubmit={handlerFormSubmit} />}
          <ModalWindow />
        </>
      )}
    </>
  );
};

export default EditArticle;
