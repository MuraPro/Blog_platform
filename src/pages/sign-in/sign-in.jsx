import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  fetchLoginUser,
  setUserIsNotEdit,
  $userRequestStatus,
  $errorUserServer,
  $userIsEdit,
} from '../../store/slices/userSlice';
import { clearArticleRequestStatus } from '../../store/slices/articleSlice';
import SignInForm from '../../components/sign-form';
import ErrorMessage from '../../components/error-message';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userRequestStatus = useSelector($userRequestStatus);
  const errorUserServer = useSelector($errorUserServer);
  const userIsEdit = useSelector($userIsEdit);

  useEffect(() => {
    if (userRequestStatus === 'fulfilled' && userIsEdit) {
      toast.success('You have logged in successfully');
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
