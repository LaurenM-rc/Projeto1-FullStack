import { Container } from 'react-bootstrap';

function Banner() {
  return (
    <div className="bg-danger-subtle py-5">
      <Container>
        <h1 className="display-5 fw-bold">Cuide da pele, brilhe do seu jeito</h1>
        <p className="lead mb-0">Maquiagem, skin care e perfumes em um só lugar.</p>
      </Container>
    </div>
  );
}

export default Banner;
