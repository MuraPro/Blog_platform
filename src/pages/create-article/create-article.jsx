import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchCreateArticle, clearArticleRequestStatus } from '../../store/slices/articleSlice';
import ArticleForm from '../../components/article-form';

const CreateArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handlerFormSubmit = ({ title, description, text: body }, tagList) => {
    dispatch(fetchCreateArticle({ title, description, body, tagList }));
    navigate('/articles', { replace: true, state: location.pathname });
    dispatch(clearArticleRequestStatus());
  };

  return <ArticleForm handlerFormSubmit={handlerFormSubmit} />;
};

export default CreateArticle;
