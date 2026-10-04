import { Container } from 'react-bootstrap';
import Header from './components/Header.jsx';
import Banner from './components/Banner.jsx';
import FormBusca from './components/FormBusca.jsx';
import ListaProdutos from './components/ListaProdutos.jsx';
import Carrinho from './components/Carrinho.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <>
      <Header />
      <Banner />
      <Container className="py-4">
        <FormBusca />
        <ListaProdutos />
      </Container>
      <Footer />
      <Carrinho />
    </>
  );
}

export default App;
