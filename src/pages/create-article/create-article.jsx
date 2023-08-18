import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  fetchCreateArticle,
  clearArticleRequestStatus,
  $singleArticle,
  $articleIsCreated,
  setArticleIsCreated,
} from '../../store/slices/articleSlice';
import { setOffset } from '../../store/slices/userSlice';

import ArticleForm from '../../components/article-form';

const CreateArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const singleArticle = useSelector($singleArticle);
  const articleIsCreated = useSelector($articleIsCreated);

  useEffect(() => {
    if (articleIsCreated) {
      toast.success('Article has created successfully');
      navigate(`/articles/${singleArticle.slug}`, { replace: true });
      dispatch(setOffset(0));
      dispatch(clearArticleRequestStatus());
      dispatch(setArticleIsCreated());
    }
  }, [articleIsCreated]);

  const handlerFormSubmit = ({ title, description, text: body }, tagList) => {
    dispatch(fetchCreateArticle({ title, description, body, tagList }));
  };

  return <ArticleForm handlerFormSubmit={handlerFormSubmit} />;
};

export default CreateArticle;
