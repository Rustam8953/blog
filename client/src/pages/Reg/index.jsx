import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import './index.css';

export const Registration = () => {
  return (
    <Paper className="reg">
      <Typography className='reg-title' variant="h5">
        Создание аккаунта
      </Typography>
      <div className='reg-avatar'>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <TextField className='reg-field' label="E-Mail" fullWidth />
      <TextField className='reg-field' label="Полное имя" fullWidth />
      <TextField className='reg-field' label="Пароль" fullWidth />
      <Button size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
    </Paper>
  );
};