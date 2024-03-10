import { Container } from '@mui/material';
import {Header} from './components/Header';
import {Home} from './pages/Home';

function App() {
  return (
    <>
      <Header  />
      <Container maxWidth="lg">
        <Home />
      </Container>
    </>
  );
}

export default App;
