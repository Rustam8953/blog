import React from 'react';
import Button from '@mui/material/Button';
import './header.css';
import Container from '@mui/material/Container';

export const Header = () => {
  const isAuth = false;
  const clickOut = () => {

  }
  return (
    <div className="root-head">
      <Container maxWidth="lg">
        <div className="inner">
          <a className="logo" href="/">
            <div>BLOG</div>
          </a>
          <div className='buttons'>
            {isAuth ? (
              <>
                <a href="/posts/create">
                  <Button variant="contained">Написать статью</Button>
                </a>
                <Button onClick={clickOut} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <a href="/login">
                  <Button variant="outlined">Войти</Button>
                </a>
                <a href="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </a>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};