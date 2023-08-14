import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  fetchUpdateUserProfile,
  setUserIsNotEdit,
  $user,
  $userRequestStatus,
  $errorUserServer,
  $userIsEdit,
} from '../../store/slices/userSlice';
import RegForm from '../../components/reg-form';
import ErrorMessage from '../../components/error-message';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector($user);
  const userRequestStatus = useSelector($userRequestStatus);
  const errorUserServer = useSelector($errorUserServer);
  const userIsEdit = useSelector($userIsEdit);

  const fromPage = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (userRequestStatus === 'fulfilled' && userIsEdit) {
      navigate(fromPage, { replace: true, state: location.pathname });
      toast.success('Users data has updated successfully!');
      dispatch(setUserIsNotEdit());
    }
  }, [userRequestStatus, userIsEdit]);

  const handlerFormSubmit = (data) => {
    dispatch(fetchUpdateUserProfile(data));
  };

  return (
    <>
      {errorUserServer && <ErrorMessage serverError={errorUserServer} />}
      <RegForm user={user} handlerFormSubmit={handlerFormSubmit} />
    </>
  );
};

export default EditProfile;
