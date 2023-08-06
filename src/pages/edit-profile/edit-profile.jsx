import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchUpdateUserProfile, setUserIsNotEdit } from '../../store/slices/userSlice';
import RegForm from '../../components/reg-form';
import ErrorMessage from '../../components/error-message';
import * as selector from '../../store/selectors/selectors';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(selector.user);
  const userRequestStatus = useSelector(selector.userRequestStatus);
  const errorUserServer = useSelector(selector.errorUserServer);
  const userIsEdit = useSelector(selector.userIsEdit);
  const fromPage = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (userRequestStatus === 'fulfilled' && userIsEdit) {
      navigate(fromPage, { replace: true, state: location.pathname });
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
