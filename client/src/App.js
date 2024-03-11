import { Container } from '@mui/material';
import {Header} from './components/Header';
import {Home} from './pages/Home';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Header  />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
