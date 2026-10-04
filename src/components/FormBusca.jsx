import { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useLoja } from '../contexts/LojaContext.jsx';

function FormBusca() {
  const { buscarProdutos, carregarVitrine, carregando, ultimaBusca } = useLoja();

  const [termo, setTermo] = useState('');
  const [ordenacao, setOrdenacao] = useState('');
  const [erro, setErro] = useState('');

  function handleSubmit(evento) {
    evento.preventDefault();

    // Validação ANTES do envio
    if (termo.trim().length < 2) {
      setErro('Digite pelo menos 2 caracteres (ex.: mascara, lipstick, perfume).');
      return;
    }
    setErro('');

    const [ordenarPor, ordem] = ordenacao ? ordenacao.split(':') : ['', ''];
    buscarProdutos({ termo: termo.trim(), ordenarPor, ordem });
  }

  function limpar() {
    setTermo('');
    setOrdenacao('');
    setErro('');
    carregarVitrine();
  }

  return (
    <Card body className="mb-4">
      <Form onSubmit={handleSubmit} noValidate>
        <Row className="g-3">
          <Col md={6}>
            <Form.Label htmlFor="termo">O que você procura? *</Form.Label>
            <Form.Control
              id="termo"
              placeholder="ex.: mascara, lipstick, perfume"
              value={termo}
              isInvalid={!!erro}
              onChange={(e) => setTermo(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">{erro}</Form.Control.Feedback>
          </Col>

          <Col md={3}>
            <Form.Label htmlFor="ordenacao">Ordenar por</Form.Label>
            <Form.Select id="ordenacao" value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
              <option value="">Relevância</option>
              <option value="price:asc">Menor preço</option>
              <option value="price:desc">Maior preço</option>
              <option value="rating:desc">Mais bem avaliados</option>
              <option value="title:asc">Nome (A–Z)</option>
            </Form.Select>
          </Col>

          <Col md={3} className="d-flex align-items-end gap-2">
            <Button type="submit" variant="dark" className="flex-grow-1" disabled={carregando}>
              {carregando ? 'Buscando...' : 'Buscar'}
            </Button>
            {ultimaBusca && (
              <Button variant="outline-secondary" onClick={limpar}>
                Limpar
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default FormBusca;
