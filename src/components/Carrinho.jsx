import { useState } from 'react';
import { Alert, Button, CloseButton, InputGroup, ListGroup, Offcanvas } from 'react-bootstrap';
import { useCarrinho } from '../contexts/CarrinhoContext.jsx';
import FormCheckout from './FormCheckout.jsx';
import { formatarPreco } from './formatadores.js';

function Carrinho() {
  const { itens, subtotal, aberto, fecharCarrinho, alterarQuantidade, remover, limpar } = useCarrinho();
  const [etapa, setEtapa] = useState('sacola'); // 'sacola' | 'checkout' | 'sucesso'
  const [numeroPedido, setNumeroPedido] = useState(null);

  function fechar() {
    fecharCarrinho();
    if (etapa === 'sucesso') setEtapa('sacola');
  }

  function concluir(id) {
    setNumeroPedido(id);
    setEtapa('sucesso');
  }

  return (
    <Offcanvas show={aberto} onHide={fechar} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Sua sacola</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {etapa === 'sucesso' && (
          <div className="text-center">
            <h3 className="h5">Pedido confirmado!</h3>
            <p>
              Seu pedido <strong>#{numeroPedido}</strong> foi registrado.
            </p>
            <Button variant="dark" onClick={fechar}>
              Continuar comprando
            </Button>
          </div>
        )}

        {etapa === 'checkout' && itens.length > 0 && (
          <FormCheckout onVoltar={() => setEtapa('sacola')} onConcluido={concluir} />
        )}

        {etapa === 'sacola' && itens.length === 0 && <Alert variant="light">Sua sacola está vazia.</Alert>}

        {etapa === 'sacola' && itens.length > 0 && (
          <>
            <ListGroup variant="flush">
              {itens.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex gap-3 align-items-start px-0">
                  <img src={item.thumbnail} alt={item.title} width="64" height="64" className="rounded bg-light" />

                  <div className="flex-grow-1">
                    <div className="fw-semibold">{item.title}</div>
                    <div className="text-muted small mb-2">{item.brand}</div>

                    <div className="d-flex justify-content-between align-items-center">
                      <InputGroup size="sm" className="w-auto">
                        <Button variant="outline-secondary" onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}>
                          −
                        </Button>
                        <InputGroup.Text>{item.quantidade}</InputGroup.Text>
                        <Button variant="outline-secondary" onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}>
                          +
                        </Button>
                      </InputGroup>
                      <strong>{formatarPreco(item.preco * item.quantidade)}</strong>
                    </div>
                  </div>

                  <CloseButton onClick={() => remover(item.id)} aria-label={`Remover ${item.title}`} />
                </ListGroup.Item>
              ))}
            </ListGroup>

            <div className="d-flex justify-content-between h5 mt-3">
              <span>Subtotal</span>
              <strong>{formatarPreco(subtotal)}</strong>
            </div>

            <div className="d-grid gap-2">
              <Button variant="dark" onClick={() => setEtapa('checkout')}>
                Finalizar compra
              </Button>
              <Button variant="outline-secondary" onClick={limpar}>
                Esvaziar sacola
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Carrinho;
