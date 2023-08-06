import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchCreateUser, setUserIsNotEdit } from '../../store/slices/userSlice';
import RegForm from '../../components/reg-form';
import ErrorMessage from '../../components/error-message';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userRequestStatus = useSelector((state) => state.user.userRequestStatus);
  const errorUserServer = useSelector((state) => state.user.errorUserServer);
  const userIsEdit = useSelector((state) => state.user.userIsEdit);

  useEffect(() => {
    if (userRequestStatus === 'fulfilled' && userIsEdit) {
      navigate('/articles', { replace: true, state: location.pathname });
      dispatch(setUserIsNotEdit());
    }
  }, [userRequestStatus, userIsEdit]);

  const handlerFormSubmit = (data) => {
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
