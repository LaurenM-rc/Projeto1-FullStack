// Estado global do catálogo (useReducer) + funções que conversam com a DummyJSON.
import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { CATEGORIAS } from '../components/formatadores.js';

const API_URL = 'https://dummyjson.com';
const SLUGS = CATEGORIAS.map((c) => c.slug);

// Função genérica de requisição: trata JSON, erros HTTP e erros de rede
async function requisicao(caminho, opcoes = {}) {
  let resposta;
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      ...opcoes,
      headers: opcoes.body ? { 'Content-Type': 'application/json' } : undefined,
    });
  } catch (erro) {
    if (erro.name === 'AbortError') throw erro;
    throw new Error('Não foi possível conectar à API. Verifique sua conexão.');
  }

  const dados = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    throw new Error(dados?.message ?? `A API respondeu com erro ${resposta.status}.`);
  }
  return dados;
}

const estadoInicial = {
  produtos: [],
  carregando: false,
  erro: null,
  ultimaBusca: null, // termo da última busca (null = vitrine inicial)
};

function lojaReducer(estado, acao) {
  switch (acao.type) {
    case 'BUSCA_INICIOU':
      return { ...estado, carregando: true, erro: null };
    case 'BUSCA_SUCESSO':
      return { ...estado, carregando: false, produtos: acao.produtos, ultimaBusca: acao.termo };
    case 'BUSCA_ERRO':
      return { ...estado, carregando: false, erro: acao.erro, produtos: [] };
    default:
      throw new Error(`Ação desconhecida: ${acao.type}`);
  }
}

const LojaContext = createContext(null);

export function LojaProvider({ children }) {
  const [estado, dispatch] = useReducer(lojaReducer, estadoInicial);

  // GET /products/category/{slug} (as 3 categorias em paralelo) — vitrine inicial
  const carregarVitrine = useCallback(async (signal) => {
    dispatch({ type: 'BUSCA_INICIOU' });
    try {
      const respostas = await Promise.all(
        SLUGS.map((slug) => requisicao(`/products/category/${slug}`, { signal })),
      );
      const produtos = respostas.flatMap((r) => r.products);
      dispatch({ type: 'BUSCA_SUCESSO', produtos, termo: null });
    } catch (erro) {
      if (erro.name !== 'AbortError') dispatch({ type: 'BUSCA_ERRO', erro: erro.message });
    }
  }, []);

  // GET /products/search?q=...&sortBy=...&order=... — busca com parâmetros.
  // A DummyJSON busca em TODO o catálogo, então mantemos só as categorias de beleza.
  const buscarProdutos = useCallback(async ({ termo, ordenarPor, ordem }) => {
    dispatch({ type: 'BUSCA_INICIOU' });
    try {
      const params = new URLSearchParams({ q: termo });
      if (ordenarPor) {
        params.append('sortBy', ordenarPor);
        params.append('order', ordem);
      }
      const dados = await requisicao(`/products/search?${params}`);
      const produtos = dados.products.filter((p) => SLUGS.includes(p.category));
      dispatch({ type: 'BUSCA_SUCESSO', produtos, termo });
    } catch (erro) {
      dispatch({ type: 'BUSCA_ERRO', erro: erro.message });
    }
  }, []);

  // POST /carts/add — finaliza o pedido (a DummyJSON apenas simula a gravação)
  const finalizarPedido = useCallback(
    (itens) =>
      requisicao('/carts/add', {
        method: 'POST',
        body: JSON.stringify({
          userId: 1,
          products: itens.map((i) => ({ id: i.id, quantity: i.quantidade })),
        }),
      }),
    [],
  );

  const valor = useMemo(
    () => ({ ...estado, carregarVitrine, buscarProdutos, finalizarPedido }),
    [estado, carregarVitrine, buscarProdutos, finalizarPedido],
  );

  return <LojaContext.Provider value={valor}>{children}</LojaContext.Provider>;
}

export function useLoja() {
  const contexto = useContext(LojaContext);
  if (!contexto) throw new Error('useLoja deve ser usado dentro de <LojaProvider>.');
  return contexto;
}
