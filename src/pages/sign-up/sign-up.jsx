import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  fetchCreateUser,
  setUserIsNotEdit,
  $userRequestStatus,
  $userIsEdit,
} from '../../store/slices/userSlice';
import RegForm from '../../components/reg-form';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userRequestStatus = useSelector($userRequestStatus);
  const userIsEdit = useSelector($userIsEdit);

  useEffect(() => {
    if (userRequestStatus === 'fulfilled' && userIsEdit) {
      toast.success('Users data has created successfully!');
      navigate('/articles', { replace: true, state: location.pathname });
      dispatch(setUserIsNotEdit());
    }
  }, [userRequestStatus, userIsEdit]);

  const handlerFormSubmit = (data) => {
    dispatch(fetchCreateUser(data));
  };

  return (
    <>
      <RegForm signUp handlerFormSubmit={handlerFormSubmit} />
    </>
  );
};

export default SignUp;
