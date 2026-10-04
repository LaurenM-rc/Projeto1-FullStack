import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useCarrinho } from '../contexts/CarrinhoContext.jsx';
import { useLoja } from '../contexts/LojaContext.jsx';

const VAZIO = { nome: '', email: '', cep: '', endereco: '' };

function validarCheckout(dados) {
  const erros = {};
  if (dados.nome.trim().length < 3) erros.nome = 'Informe seu nome completo.';
  if (!/^\S+@\S+\.\S+$/.test(dados.email.trim())) erros.email = 'Informe um e-mail válido.';
  if (dados.cep.replace(/\D/g, '').length !== 8) erros.cep = 'O CEP deve ter 8 números.';
  if (dados.endereco.trim().length < 5) erros.endereco = 'Informe rua, número e bairro.';
  return erros;
}

function FormCheckout({ onVoltar, onConcluido }) {
  const { itens, limpar } = useCarrinho();
  const { finalizarPedido } = useLoja();

  const [dados, setDados] = useState(VAZIO);
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState(null);

  function handleChange(evento) {
    const { name, value } = evento.target;
    setDados((anterior) => ({ ...anterior, [name]: value }));
  }

  async function handleSubmit(evento) {
    evento.preventDefault();
    setErroEnvio(null);

    // 1. Validação ANTES do envio
    const errosEncontrados = validarCheckout(dados);
    setErros(errosEncontrados);
    if (Object.keys(errosEncontrados).length > 0) return;

    // 2. Envio (POST com JSON)
    setEnviando(true);
    try {
      const pedido = await finalizarPedido(itens);
      limpar();
      onConcluido(pedido.id); // 3a. sucesso DEPOIS do envio
    } catch (erro) {
      setErroEnvio(erro.message); // 3b. erro DEPOIS do envio
    } finally {
      setEnviando(false);
    }
  }

  const campo = (name, label, props = {}) => (
    <Form.Group className="mb-3" controlId={`checkout-${name}`}>
      <Form.Label>{label} *</Form.Label>
      <Form.Control name={name} value={dados[name]} onChange={handleChange} isInvalid={!!erros[name]} {...props} />
      <Form.Control.Feedback type="invalid">{erros[name]}</Form.Control.Feedback>
    </Form.Group>
  );

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <h3 className="h6 mb-3">Dados para entrega</h3>
      {erroEnvio && <Alert variant="danger">{erroEnvio}</Alert>}

      {campo('nome', 'Nome completo')}
      {campo('email', 'E-mail', { type: 'email' })}
      {campo('cep', 'CEP', { placeholder: '00000-000' })}
      {campo('endereco', 'Endereço')}

      <div className="d-grid gap-2">
        <Button type="submit" variant="dark" disabled={enviando}>
          {enviando ? 'Enviando pedido...' : 'Confirmar pedido'}
        </Button>
        <Button variant="outline-secondary" onClick={onVoltar} disabled={enviando}>
          Voltar para a sacola
        </Button>
      </div>
    </Form>
  );
}

export default FormCheckout;
