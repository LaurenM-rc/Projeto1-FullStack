import { Badge, Button, Col, ListGroup, Modal, Row } from 'react-bootstrap';
import { useCarrinho } from '../contexts/CarrinhoContext.jsx';
import { formatarPreco, nomeCategoria, precoComDesconto } from './formatadores.js';

function ModalProduto({ produto, onFechar }) {
  const { adicionar } = useCarrinho();

  return (
    <Modal show={!!produto} onHide={onFechar} size="lg" centered>
      {produto && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{produto.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row className="g-4">
              <Col md={5}>
                <img src={produto.images[0]} alt={produto.title} className="img-fluid rounded bg-light" />
              </Col>

              <Col md={7}>
                <p className="text-muted mb-1">
                  {nomeCategoria(produto.category)} · {produto.brand}
                </p>
                <p>{produto.description}</p>

                <p className="h4">
                  {formatarPreco(precoComDesconto(produto))}{' '}
                  {produto.discountPercentage >= 1 && (
                    <small className="text-muted fs-6">
                      <s>{formatarPreco(produto.price)}</s>
                    </small>
                  )}
                </p>

                <p>
                  <Badge bg={produto.stock > 0 ? 'success' : 'secondary'}>
                    {produto.stock > 0 ? `${produto.stock} em estoque` : 'Esgotado'}
                  </Badge>
                </p>
                <p className="text-muted small">
                  {produto.shippingInformation} · {produto.returnPolicy}
                </p>

                <Button
                  variant="dark"
                  disabled={produto.stock === 0}
                  onClick={() => {
                    adicionar(produto);
                    onFechar();
                  }}
                >
                  Adicionar à sacola
                </Button>
              </Col>
            </Row>

            <h3 className="h6 mt-4">Avaliações</h3>
            <ListGroup variant="flush">
              {produto.reviews.map((r, i) => (
                <ListGroup.Item key={i}>
                  <span className="text-warning">{'★'.repeat(r.rating)}</span> {r.comment}
                  <div className="text-muted small">{r.reviewerName}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
}

export default ModalProduto;
