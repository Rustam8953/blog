import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from 'react-hook-form';
import './index.css';
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Login = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const {register, handleSubmit, formState:{errors, isValid}} = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange'
    });
    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values))
        if(!data.payload) return alert('Не удалось авторизоваться');
        if('token' in data.payload) window.localStorage.setItem('token', data.payload.token);
    }
    if(isAuth) {
        return <Navigate to='/' />
    }
    return (
        <Paper className='login'>
        <Typography className='login-title' variant="h5">
            Вход в аккаунт
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                className='login-field'
                label="E-Mail"
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register('email', {required: "Укажите почту"})}
                fullWidth
            />
            <TextField 
                className='login-field' 
                label="Пароль"
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {...register('password', {required: "Укажите пароль"})} fullWidth 
            />
            <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                Войти
            </Button>
        </form>
        </Paper>
    );
};