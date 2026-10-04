// Funções auxiliares (a API devolve preços em dólar).
const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD' });

export const formatarPreco = (valor) => moeda.format(valor);

// Categorias da DummyJSON que compõem a loja de beleza
export const CATEGORIAS = [
  { slug: 'beauty', nome: 'Maquiagem' },
  { slug: 'skin-care', nome: 'Skin care' },
  { slug: 'fragrances', nome: 'Perfumes' },
];

export const nomeCategoria = (slug) => CATEGORIAS.find((c) => c.slug === slug)?.nome ?? slug;

export const precoComDesconto = (produto) =>
  produto.price * (1 - produto.discountPercentage / 100);
