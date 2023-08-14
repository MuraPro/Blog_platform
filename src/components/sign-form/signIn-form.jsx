import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { $disabled } from '../../store/slices/articleSlice';

const SignInForm = ({ handleFormSubmit }) => {
  const disabled = useSelector($disabled);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Поле "Email" должно быть заполнено')
      .email('Email не верный')
      .lowercase(),
    password: Yup.string()
      .min(6, 'Поле "Password" не должно содержать менее 6 символов')
      .required('Поле "Password" должно быть заполнено'),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    handleFormSubmit({ ...data });
  };

  return (
    <Box
      sx={{
        m: 'auto',
        mt: 10,
        maxWidth: 384,
      }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper sx={{ p: 5 }}>
          <Typography
            variant="h6"
            justify="center"
            align="center"
            sx={{
              mb: 1,
            }}>
            Sign In
          </Typography>

          <Typography>Email address</Typography>

          <TextField
            id="email"
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              mb: 1,
            }}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Enter correct email',
              },
            })}
            error={!!errors?.email}
            helperText={errors?.email?.message}
          />

          <Typography>Password</Typography>
          <TextField
            type="password"
            id="password"
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              mb: 3,
            }}
            {...register('password')}
            error={!!errors?.password}
            helperText={errors?.password?.message}
          />

          <Button
            disabled={disabled}
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mb: 2,
            }}>
            Login
          </Button>

          <Typography variant="body2" justify="center" align="center">
            Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
          </Typography>
        </Paper>
      </form>
    </Box>
  );
};

SignInForm.propTypes = {
  handleFormSubmit: PropTypes.func,
};

SignInForm.defaultProps = {
  handleFormSubmit: () => {},
};

export default SignInForm;
