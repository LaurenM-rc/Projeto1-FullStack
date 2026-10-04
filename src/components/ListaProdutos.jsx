import { useEffect, useState } from 'react';
import { Alert, Button, ButtonGroup, Col, Row, Spinner } from 'react-bootstrap';
import { useLoja } from '../contexts/LojaContext.jsx';
import { CATEGORIAS } from './formatadores.js';
import CardProduto from './CardProduto.jsx';
import ModalProduto from './ModalProduto.jsx';

function ListaProdutos() {
  const { produtos, carregando, erro, ultimaBusca, carregarVitrine } = useLoja();
  const [categoria, setCategoria] = useState('');
  const [selecionado, setSelecionado] = useState(null);

  // Carga inicial: executa uma vez, quando o componente aparece
  useEffect(() => {
    const controlador = new AbortController();
    carregarVitrine(controlador.signal);
    return () => controlador.abort();
  }, [carregarVitrine]);

  // Estado 1 — carregando
  if (carregando) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  // Estado 2 — erro
  if (erro) {
    return <Alert variant="danger">Não foi possível carregar os produtos. {erro}</Alert>;
  }

  const visiveis = categoria ? produtos.filter((p) => p.category === categoria) : produtos;

  return (
    <section>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h2 className="h4 mb-0">{ultimaBusca ? `Resultados para “${ultimaBusca}”` : 'Nossos produtos'}</h2>

        <ButtonGroup>
          <Button variant={categoria === '' ? 'dark' : 'outline-dark'} onClick={() => setCategoria('')}>
            Tudo
          </Button>
          {CATEGORIAS.map((c) => (
            <Button
              key={c.slug}
              variant={categoria === c.slug ? 'dark' : 'outline-dark'}
              onClick={() => setCategoria(c.slug)}
            >
              {c.nome}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {/* Estado 3 — vazio */}
      {visiveis.length === 0 ? (
        <Alert variant="warning">Nenhum produto encontrado. Tente outro termo ou categoria.</Alert>
      ) : (
        // Estado 4 — sucesso
        <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
          {visiveis.map((produto) => (
            <Col key={produto.id}>
              <CardProduto produto={produto} onDetalhes={setSelecionado} />
            </Col>
          ))}
        </Row>
      )}

      <ModalProduto produto={selecionado} onFechar={() => setSelecionado(null)} />
    </section>
  );
}

export default ListaProdutos;
