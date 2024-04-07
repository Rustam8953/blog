import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReg, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const {register, handleSubmit, formState:{errors, isValid}} = useForm({
      defaultValues: {
        fullName: "",
        email: '',
        password: ''
      },
      mode: 'onChange'
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchReg(values))
    if(!data.payload) return alert('Не удалось зарегистрироваться');
    if('token' in data.payload) window.localStorage.setItem('token', data.payload.token);
  }
  if(isAuth) {
    return <Navigate to='/' />
  }
  return (
    <Paper className="reg">
      <Typography className='reg-title' variant="h5">
        Создание аккаунта
      </Typography>
      <div className='reg-avatar'>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          className='reg-field' 
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', {required: "Укажите почту"})}
          fullWidth
        />
        <TextField className='reg-field' label="Полное имя"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', {required: "Укажите почту"})}
          fullWidth
        />
        <TextField className='reg-field' label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', {required: "Укажите почту"})}
          fullWidth
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};