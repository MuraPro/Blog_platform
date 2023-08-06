import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoginUser, setUserIsNotEdit } from '../../store/slices/userSlice';
import { clearArticleRequestStatus } from '../../store/slices/articleSlice';
import * as selector from '../../store/selectors/selectors';
import SignInForm from '../../components/sign-form';
import ErrorMessage from '../../components/error-message';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userRequestStatus = useSelector(selector.userRequestStatus);
  const errorUserServer = useSelector(selector.errorUserServer);
  const userIsEdit = useSelector(selector.userIsEdit);

  useEffect(() => {
    if (userRequestStatus === 'fulfilled' && userIsEdit) {
      navigate('/articles', { replace: true, state: location.pathname });
      dispatch(setUserIsNotEdit());
    }
  }, [userRequestStatus, userIsEdit]);

  const handleFormSubmit = (data) => {
    dispatch(clearArticleRequestStatus());
    dispatch(fetchLoginUser({ email: data.email, password: data.password }));
  };
  return (
    <>
      {errorUserServer && <ErrorMessage serverError={errorUserServer} />}
      <SignInForm handleFormSubmit={handleFormSubmit} />
    </>
  );
};

export default SignIn;
