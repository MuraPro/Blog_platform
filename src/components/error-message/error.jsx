import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { resetUserError } from '../../store/slices/userSlice';

function ErrorMessage({ serverError }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = Object.entries(serverError.statusText);

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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {`${errors[0][0]}  ${errors[0][1]}`}
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
