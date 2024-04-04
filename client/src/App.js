import { Container } from '@mui/material';
import {Header} from './components/Header';
import {Home} from './pages/Home';
import {Routes, Route} from 'react-router-dom';
import { PostPage } from './pages/PostPage';

function App() {
  return (
    <>
      <Header  />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
