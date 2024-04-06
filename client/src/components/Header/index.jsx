import React from 'react';
import Button from '@mui/material/Button';
import './header.css';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const clickOut = () => {
    if(window.confirm('Хотите выйти из ситемы?')) {
      dispatch(logout());
    }
  }
  return (
    <div className="root-head">
      <Container maxWidth="lg">
        <div className="inner">
          <Link className="logo" to="/">
            <div>BLOG</div>
          </Link>
          <div className='buttons'>
            {isAuth ? (
              <>
                <Link to="/posts/create">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={clickOut} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};