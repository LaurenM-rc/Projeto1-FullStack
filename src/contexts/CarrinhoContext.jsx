// Carrinho de compras: useReducer (hook escolhido) + useMemo para os totais.
import { createContext, useContext, useMemo, useReducer, useState } from 'react';
import { precoComDesconto } from '../components/formatadores.js';

function carrinhoReducer(itens, acao) {
  switch (acao.type) {
    case 'ADICIONAR': {
      const existe = itens.some((i) => i.id === acao.produto.id);
      if (existe) {
        return itens.map((i) =>
          i.id === acao.produto.id ? { ...i, quantidade: i.quantidade + 1 } : i,
        );
      }
      const { id, title, brand, thumbnail } = acao.produto;
      return [...itens, { id, title, brand, thumbnail, preco: precoComDesconto(acao.produto), quantidade: 1 }];
    }
    case 'ALTERAR_QUANTIDADE':
      return itens
        .map((i) => (i.id === acao.id ? { ...i, quantidade: acao.quantidade } : i))
        .filter((i) => i.quantidade > 0);
    case 'REMOVER':
      return itens.filter((i) => i.id !== acao.id);
    case 'LIMPAR':
      return [];
    default:
      throw new Error(`Ação desconhecida: ${acao.type}`);
  }
}

const CarrinhoContext = createContext(null);

export function CarrinhoProvider({ children }) {
  const [itens, dispatch] = useReducer(carrinhoReducer, []);
  const [aberto, setAberto] = useState(false);

  const totais = useMemo(
    () => ({
      quantidade: itens.reduce((soma, i) => soma + i.quantidade, 0),
      subtotal: itens.reduce((soma, i) => soma + i.preco * i.quantidade, 0),
    }),
    [itens],
  );

  const valor = {
    itens,
    ...totais,
    aberto,
    abrirCarrinho: () => setAberto(true),
    fecharCarrinho: () => setAberto(false),
    adicionar: (produto) => {
      dispatch({ type: 'ADICIONAR', produto });
      setAberto(true);
    },
    alterarQuantidade: (id, quantidade) => dispatch({ type: 'ALTERAR_QUANTIDADE', id, quantidade }),
    remover: (id) => dispatch({ type: 'REMOVER', id }),
    limpar: () => dispatch({ type: 'LIMPAR' }),
  };

  return <CarrinhoContext.Provider value={valor}>{children}</CarrinhoContext.Provider>;
}

export function useCarrinho() {
  const contexto = useContext(CarrinhoContext);
  if (!contexto) throw new Error('useCarrinho deve ser usado dentro de <CarrinhoProvider>.');
  return contexto;
}
