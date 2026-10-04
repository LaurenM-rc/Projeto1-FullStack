import { Badge, Button, Card } from 'react-bootstrap';
import { useCarrinho } from '../contexts/CarrinhoContext.jsx';
import { formatarPreco, nomeCategoria, precoComDesconto } from './formatadores.js';

function CardProduto({ produto, onDetalhes }) {
  const { adicionar } = useCarrinho();
  const temDesconto = produto.discountPercentage >= 1;

  return (
    <Card className="h-100">
      <div className="position-relative bg-light">
        <Card.Img variant="top" src={produto.thumbnail} alt={produto.title} />
        {temDesconto && (
          <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
            -{Math.round(produto.discountPercentage)}%
          </Badge>
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Text className="text-muted small mb-1">{nomeCategoria(produto.category)}</Card.Text>
        <Card.Title as="h3" className="h6">
          {produto.title}
        </Card.Title>
        <Card.Text className="mb-1">{produto.brand}</Card.Text>
        <Card.Text className="text-warning">★ {produto.rating.toFixed(1)}</Card.Text>

        <div className="mt-auto">
          <span className="h5 me-2">{formatarPreco(precoComDesconto(produto))}</span>
          {temDesconto && <s className="text-muted">{formatarPreco(produto.price)}</s>}
        </div>

        <div className="d-grid gap-2 mt-3">
          <Button variant="dark" disabled={produto.stock === 0} onClick={() => adicionar(produto)}>
            {produto.stock === 0 ? 'Esgotado' : 'Adicionar à sacola'}
          </Button>
          <Button variant="outline-secondary" size="sm" onClick={() => onDetalhes(produto)}>
            Ver detalhes
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardProduto;
