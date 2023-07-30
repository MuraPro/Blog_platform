import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchEditArticle, fetchSingleArticle } from '../../store/slices/articleSlice';
import ArticleForm from '../../components/article-form';
import ModalWindow from '../../components/modal-window';
import ErrorMessage from '../../components/error-message';
import Spinner from '../../components/spinner';

const EditArticle = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const article = useSelector((state) => state.articles.singleArticle);

  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const articleRequestStatus = useSelector((state) => state.articles.articleRequestStatus);
  const errorArticleServer = useSelector((state) => state.articles.errorArticleServer);
  const articleIsCreated = useSelector((state) => state.articles.articleIsCreated);

  useEffect(() => {
    dispatch(fetchSingleArticle(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (articleIsCreated === true) {
      navigate(fromPage, { replace: true });
    }
  }, [navigate, fromPage, articleIsCreated]);

  const handlerFormSubmit = ({ title, description, text: body }, tagList) => {
    dispatch(fetchEditArticle({ slug, title, description, body, tagList }));

    navigate(fromPage, { replace: true });
  };

  return (
    <>
      {articleRequestStatus === 'rejected' && <ErrorMessage serverError={errorArticleServer} />}
      {articleRequestStatus === 'pending' && <Spinner />}
      {articleRequestStatus === 'fulfilled' && article && (
        <>
          <ArticleForm article={article} handlerFormSubmit={handlerFormSubmit} />
          <ModalWindow />
        </>
      )}
    </>
  );
};

export default EditArticle;
