# Aurora Beauty 🌸

E-commerce de produtos de beleza (maquiagem, skin care e perfumes) — **Projeto 1 · ReactJS** da disciplina Programação Web Full Stack (SPA com React + AJAX).

## Funcionalidades

- Vitrine carregada da **DummyJSON** (`GET /products/category/{beauty|skin-care|fragrances}`), via `useEffect`
- **Busca com parâmetros** (`GET /products/search?q=...&sortBy=...&order=...`) com validação antes do envio
- Filtro por categoria, detalhes do produto (modal) e avaliações
- **Sacola de compras** (adicionar, alterar quantidade, remover)
- **Checkout** com validação antes do envio e `POST /carts/add` com JSON; mensagens de erro/sucesso depois do envio
- Quatro estados de tela: carregando, erro, vazio e sucesso

## Requisitos do projeto

| Item | Escolha |
| --- | --- |
| API JSON aberta | [DummyJSON](https://dummyjson.com/docs/products) |
| Hook / funcionalidade React | `useReducer` (catálogo e carrinho) — com Context API; `useMemo` para totais e filtros |
| Biblioteca externa | [React-Bootstrap](https://react-bootstrap.github.io/) + Bootstrap |

## Estrutura

```
src/
├── main.jsx      ← ponto de entrada (monta os Providers)
├── App.jsx       ← monta a página
├── components/   Header, Banner, FormBusca, ListaProdutos, CardProduto,
│                 ModalProduto, Carrinho, FormCheckout, Footer, formatadores.js
└── contexts/     LojaContext.jsx (catálogo + API) · CarrinhoContext.jsx (sacola)
```

A interface usa apenas componentes e classes do Bootstrap (sem CSS próprio).

## Como rodar

```bash
npm install     # só na primeira vez
npm run dev
```

Abra o endereço mostrado no terminal (normalmente http://localhost:5173).

## Observações

- A DummyJSON **simula** a gravação: o `POST /carts/add` devolve um `id`, mas o pedido não é persistido.
- Os preços vêm em dólar (US$), como na API.

## Uso de ferramentas de apoio (IA)

Estrutura inicial do código gerada com apoio do Claude (Anthropic), com base no material da disciplina (capítulo 5). 

## Equipe

- Lauren Marçulo RA: 2767090
- Manuella Vieira Reginato RA: 2767120
