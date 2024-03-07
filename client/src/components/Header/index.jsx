import React from 'react';
import Button from '@mui/material/Button';
import './header.css';
import Container from '@mui/material/Container';

export const Header = () => {
  return (
    <div className="root">
      <Container maxWidth="lg">
        <div className="inner">
          <a className="logo" href="/">
            <div>BLOG</div>
          </a>
          <div className="buttons">
              <>
                <a href="/login">
                  <Button variant="outlined">Войти</Button>
                </a>
                <a href="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </a>
              </>
          </div>
        </div>
      </Container>
    </div>
  );
};