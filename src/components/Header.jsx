import { Badge, Button, Container, Navbar } from 'react-bootstrap';
import { useCarrinho } from '../contexts/CarrinhoContext.jsx';

function Header() {
  const { quantidade, abrirCarrinho } = useCarrinho();

  return (
    <Navbar bg="dark" data-bs-theme="dark" sticky="top">
      <Container>
        <Navbar.Brand href="#">Aurora Beauty</Navbar.Brand>
        <Button variant="outline-light" onClick={abrirCarrinho}>
          Sacola <Badge bg="danger">{quantidade}</Badge>
        </Button>
      </Container>
    </Navbar>
  );
}

export default Header;
