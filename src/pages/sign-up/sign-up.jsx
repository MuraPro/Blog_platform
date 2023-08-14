import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  fetchCreateUser,
  setUserIsNotEdit,
  $userRequestStatus,
  $errorUserServer,
  $userIsEdit,
} from '../../store/slices/userSlice';
import RegForm from '../../components/reg-form';
import ErrorMessage from '../../components/error-message';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userRequestStatus = useSelector($userRequestStatus);
  const errorUserServer = useSelector($errorUserServer);
  const userIsEdit = useSelector($userIsEdit);

  useEffect(() => {
    if (userRequestStatus === 'fulfilled' && userIsEdit) {
      navigate('/articles', { replace: true, state: location.pathname });
      dispatch(setUserIsNotEdit());
    }
  }, [userRequestStatus, userIsEdit]);

  const handlerFormSubmit = (data) => {
    toast.success('Users data has created successfully!');
    dispatch(fetchCreateUser(data));
  };

  return (
    <>
      {errorUserServer && <ErrorMessage serverError={errorUserServer} />}
      <RegForm signUp handlerFormSubmit={handlerFormSubmit} />
    </>
  );
};

export default SignUp;
