import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Snackbar, Alert } from '@mui/material';
import { resetUserError, $errorUserServer } from '../../store/slices/userSlice';

function ErrorMessage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serverError = useSelector($errorUserServer);

  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (serverError.status === 404) {
      dispatch(resetUserError());
      navigate('/error', { replace: true });
    }
  }, [navigate, serverError]);
  const handleClose = () => {
    setOpen(false);
    dispatch(resetUserError());
  };
  return (
    <div>
      <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {serverError?.statusText?.email && `Email ${serverError?.statusText?.email} `}
          {serverError?.statusText?.username && ` Username ${serverError?.statusText?.username}`}
          {serverError?.statusText['email or password'] &&
            ` email or password ${serverError?.statusText['email or password']}`}
        </Alert>
      </Snackbar>
    </div>
  );
}

ErrorMessage.propTypes = {
  serverError: PropTypes.object,
};

ErrorMessage.defaultProps = {
  serverError: {},
};

export default ErrorMessage;
