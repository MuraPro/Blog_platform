import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchCreateArticle, clearArticleRequestStatus } from '../../store/slices/articleSlice';
import { setOffset } from '../../store/slices/userSlice';

import ArticleForm from '../../components/article-form';

const CreateArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerFormSubmit = ({ title, description, text: body }, tagList) => {
    dispatch(fetchCreateArticle({ title, description, body, tagList }));
    navigate('/articles', { replace: true });
    toast.success('Article has created successfully');
    dispatch(setOffset(0));
    dispatch(clearArticleRequestStatus());
  };

  return <ArticleForm handlerFormSubmit={handlerFormSubmit} />;
};

export default CreateArticle;
