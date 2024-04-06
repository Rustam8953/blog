import { useEffect } from 'react';
import { Container } from '@mui/material';
import {Header} from './components/Header';
import {Home} from './pages/Home';
import {Routes, Route} from 'react-router-dom';
import { PostPage } from './pages/PostPage';
import { Login } from './pages/Log';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [])
  return (
    <>
      <Header  />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
