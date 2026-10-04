<div align="center">

# 🌸 Aurora Beauty

**Loja virtual de maquiagem, skin care e perfumes**
Projeto 1 · ReactJS — Programação Web Full Stack

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/React--Bootstrap-UI-7952B3?logo=bootstrap&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-publicado-222222?logo=github&logoColor=white)

### 🔗 [Acessar a loja online](https://laurenm-rc.github.io/Projeto1-FullStack/)

`https://laurenm-rc.github.io/Projeto1-FullStack/`

</div>

---

## 📖 Sobre o projeto

A **Aurora Beauty** é uma aplicação web de e-commerce de produtos de beleza, construída como uma **SPA (Single Page Application)** em React. Todos os dados vêm de uma API JSON pública, a [DummyJSON](https://dummyjson.com/docs/products), consumida com `fetch` (AJAX), sem recarregar a página.

Na loja é possível navegar pela vitrine, buscar produtos, ver detalhes e avaliações, montar a sacola de compras e finalizar um pedido.

## ✨ Funcionalidades

| Funcionalidade | Descrição |
| --- | --- |
| 🛍️ **Vitrine** | Carrega produtos de 3 categorias: Maquiagem, Skin care e Perfumes. |
| 🔎 **Busca com parâmetros** | Busca por termo e ordenação (preço, nota, nome), enviada à API como *query string*. |
| 🗂️ **Filtro por categoria** | Botões para filtrar a vitrine sem nova requisição. |
| 🔍 **Detalhes do produto** | Janela (modal) com descrição, estoque, entrega, troca e avaliações. |
| 👜 **Sacola de compras** | Adicionar, aumentar/diminuir quantidade, remover e ver o subtotal. |
| ✅ **Checkout** | Formulário de entrega com validação e envio do pedido (`POST` em JSON). |
| ⚠️ **Estados de tela** | Carregando, erro, vazio e sucesso, em todas as consultas à API. |

## 🧰 Tecnologias

- **[React](https://react.dev/)** — interface em componentes
- **[Vite](https://vite.dev/)** — ambiente de desenvolvimento e build
- **[React-Bootstrap](https://react-bootstrap.github.io/)** + **[Bootstrap](https://getbootstrap.com/)** — layout e componentes da interface (sem CSS próprio)
- **[DummyJSON](https://dummyjson.com/)** — API JSON aberta
- **[GitHub Pages](https://pages.github.com/)** + **gh-pages** — publicação

## ✅ Requisitos do projeto

| Requisito | O que foi usado |
| --- | --- |
| API JSON aberta | DummyJSON |
| Hook / funcionalidade do React | **`useReducer`** (catálogo e sacola) |
| Biblioteca externa | **React-Bootstrap** |
| Comunicação entre componentes | **Context API** (`LojaContext` e `CarrinhoContext`) |
| Busca com envio de parâmetros | `URLSearchParams` (`q`, `sortBy`, `order`) |
| Validação antes e depois do envio | Mensagens por campo + tratamento de erro da API |
| Estrutura | Apenas `src/components` e `src/contexts` |
| Publicação | GitHub Pages |

## 🔌 Endpoints utilizados

| Método | Endpoint | Para quê |
| --- | --- | --- |
| `GET` | `/products/category/beauty` | Produtos de maquiagem |
| `GET` | `/products/category/skin-care` | Produtos de skin care |
| `GET` | `/products/category/fragrances` | Perfumes |
| `GET` | `/products/search?q=...&sortBy=...&order=...` | Busca com parâmetros |
| `POST` | `/carts/add` | Finalizar o pedido (corpo em JSON) |

> A DummyJSON **simula** a gravação: o `POST` devolve um número de pedido, mas ele não é salvo no servidor. A busca da API percorre todo o catálogo, então a aplicação mantém só os produtos das três categorias de beleza.

## 🧠 Como funciona

### Estado global com `useReducer` + Context API

- **`LojaContext`** guarda o catálogo (`produtos`, `carregando`, `erro`, `ultimaBusca`). Como esses campos mudam sempre juntos, um *reducer* centraliza as ações `BUSCA_INICIOU`, `BUSCA_SUCESSO` e `BUSCA_ERRO`. É aqui também que ficam as funções que falam com a API.
- **`CarrinhoContext`** guarda a sacola. O *reducer* trata as ações `ADICIONAR`, `ALTERAR_QUANTIDADE`, `REMOVER` e `LIMPAR`, e os totais são calculados com `useMemo`.

Os componentes não conhecem a URL da API nem o `fetch`: eles só chamam funções como `buscarProdutos` e `finalizarPedido`.


## 📁 Estrutura de pastas

```
aurora-beauty/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                   ← ponto de entrada (monta os Providers)
    ├── App.jsx                    ← monta a página
    ├── components/
    │   ├── Header.jsx             ← barra superior e botão da sacola
    │   ├── Banner.jsx             ← destaque da página inicial
    │   ├── FormBusca.jsx          ← busca com validação
    │   ├── ListaProdutos.jsx      ← vitrine, filtros e estados de tela
    │   ├── CardProduto.jsx        ← card de cada produto
    │   ├── ModalProduto.jsx       ← detalhes e avaliações
    │   ├── Carrinho.jsx           ← sacola lateral
    │   ├── FormCheckout.jsx       ← dados de entrega e envio do pedido
    │   ├── Footer.jsx
    │   └── formatadores.js        ← moeda, categorias e preço com desconto
    └── contexts/
        ├── LojaContext.jsx        ← catálogo + acesso à API
        └── CarrinhoContext.jsx    ← sacola de compras
```


## 🤖 Ferramentas de apoio

Durante o desenvolvimento foi utilizada uma ferramenta de **inteligência artificial (Claude, da Anthropic)** como apoio, em itens como a organização inicial do código, revisão e explicações dos conceitos do material da disciplina. O código foi revisado, testado e ajustado pelo grupo.

## 👩‍💻 Equipe

| Integrante | RA |
| --- | --- |
| [Lauren Marçulo] | 2767090 |
| [Manuella Vieira Reginato | 2767120 |

---

<div align="center">

Projeto acadêmico · UTFPR — Cornélio Procópio · Dados fictícios fornecidos pela DummyJSON

</div>
