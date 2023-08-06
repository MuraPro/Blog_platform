import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const RegForm = ({ signUp, user, handlerFormSubmit }) => {
  const formTitle = signUp ? 'Create new account' : 'Edit profile';
  const buttonLabel = signUp ? 'Create' : 'Save';

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required('Поле "Имя пользователя" должно быть заполнено')
      .min(3, 'Имя пользователя не должно содержать менее 3 символов')
      .max(20, 'Имя пользователя не должно содержать более 20 символов'),
    email: Yup.string().required('Поле "Email" должно быть заполнено').email('Email не верный'),
    password: Yup.string()
      .min(6, 'Поле "Password" не должно содержать менее 6 символов')
      .required('Поле "Password" должно быть заполнено'),
    confirmPassword: Yup.string()
      .required('Поле "Confirm Password" должно быть заполнено')
      .oneOf([Yup.ref('password'), null], 'Passwords должны совпадать'),
    acceptPersonalInf: Yup.bool().oneOf(
      [true],
      'Предоставьте согласие на обработку персональных данных',
    ),
    avatarUrl: Yup.string().url('Введите корректный URL'),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      userName: user?.username,
      email: user?.email,
      avatarUrl: user?.image,
    },
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    handlerFormSubmit({ ...data });
  };

  return (
    <Box
      sx={{
        m: 'auto',
        mt: 10,
        maxWidth: 384,
      }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper
          sx={{
            p: 5,
          }}>
          <Typography
            variant="h6"
            justify="center"
            align="center"
            sx={{
              mb: 1,
            }}>
            {formTitle}
          </Typography>

          <TextField
            id="userName"
            label="User name"
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              mb: 1,
            }}
            {...register('userName')}
            error={!!errors?.userName}
            helperText={errors?.userName?.message}
          />

          <TextField
            id="email"
            type="email"
            variant="outlined"
            label="Email address"
            size="small"
            fullWidth
            sx={{
              mb: 1,
            }}
            {...register('email')}
            error={!!errors?.email}
            helperText={errors?.email?.message}
          />

          <TextField
            id="password"
            label={signUp ? 'Password' : 'New password'}
            type="password"
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              mb: 1,
            }}
            {...register('password')}
            error={!!errors?.password}
            helperText={errors?.password?.message}
          />

          <TextField
            id="confirmPassword"
            label="Repeat password"
            type="password"
            size="small"
            fullWidth
            sx={{
              mb: 2,
            }}
            {...register('confirmPassword')}
            error={!!errors?.confirmPassword}
            helperText={errors?.confirmPassword?.message}
          />

          {!signUp && (
            <TextField
              id="avatarUrl"
              type="url"
              label="Avatar image (url)"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                mb: 2,
              }}
              {...register('avatarUrl')}
              error={!!errors?.avatarUrl}
              helperText={errors?.avatarUrl?.message}
            />
          )}
          {signUp && (
            <>
              <Divider
                sx={{
                  mb: 1,
                }}
              />

              <FormControlLabel
                control={<Checkbox {...register('acceptPersonalInf')} />}
                label="I agree to the processing of my personal
information"
              />
              {!!errors?.acceptPersonalInf && (
                <Typography variant="caption" display="block" gutterBottom sx={{ color: 'red' }}>
                  {errors?.acceptPersonalInf?.message}
                </Typography>
              )}
            </>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              my: 2,
            }}>
            {buttonLabel}
          </Button>

          {signUp && (
            <Typography variant="body2" justify="center" align="center">
              Already have an account? <Link to="/sign-in">Sign In.</Link>
            </Typography>
          )}
        </Paper>
      </form>
    </Box>
  );
};

RegForm.propTypes = {
  signUp: PropTypes.bool,
  user: PropTypes.object,
  handlerFormSubmit: PropTypes.func,
};

RegForm.defaultProps = {
  user: {},
  handlerFormSubmit: () => {},
};

export default RegForm;
