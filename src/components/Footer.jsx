import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white-50 py-3 mt-4">
      <Container className="d-flex flex-wrap justify-content-between">
        <span>Aurora Beauty</span>
        <span>Projeto acadêmico · dados fictícios da DummyJSON</span>
      </Container>
    </footer>
  );
}

export default Footer;
