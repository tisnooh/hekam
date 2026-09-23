import type { Product } from '@/lib/types';

/** Catalogue local de démonstration — images remplaçables dans /public/images. */
export const PRODUCTS: Product[] = [
  {
    slug: 'eclosion',
    name: 'Éclosion',
    tagline: 'Vanille / Framboise',
    description:
      'Un biscuit vanille imbibé au sirop de Madagascar, une crème légère à la vanille bourbon et un insert de framboises fraîches. Le dessus se déploie comme un ruban de soie.',
    composition: ['Biscuit moelleux vanille', 'Crème légère vanille bourbon', 'Insert framboises fraîches', 'Finition ruban de beurre de cacao'],
    allergens: ['Gluten', 'Œufs', 'Lait'],
    persons: '6–8 personnes',
    dimensions: 'Ø 18 cm · H 9 cm',
    priceFrom: 65,
    image: '/images/products/eclosion.jpg',
    gallery: ['/images/products/eclosion.jpg', '/images/editorial/gallery-detail.jpg', '/images/editorial/gallery-texture.jpg'],
    tags: ['anniversaire', 'fruits'],
    available: true,
    availableFrom: 'Sous 48 h',
    storage: 'Au réfrigérateur 3 jours. Sortir 30 minutes avant dégustation.',
    detail:
      'Chaque Éclosion est dressée à la commande : le ruban de crème est poché minute, puis reposé une nuit pour tenir sa forme sans aucun additif.',
  },
  {
    slug: 'intense',
    name: 'Intense',
    tagline: 'Chocolat / Praliné',
    description:
      'Un grand cru de chocolat noir 70 %, un praliné noisette torréfié à l’atelier et une ganache montée au parfum de fève tonka. Pour celles et ceux qui aiment le chocolat sans compromis.',
    composition: ['Biscuit cacao', 'Ganache grand cru 70 %', 'Praliné noisette maison', 'Voile de feuille d’or'],
    allergens: ['Gluten', 'Œufs', 'Lait', 'Soja', 'Fruits à coque'],
    persons: '6–8 personnes',
    dimensions: 'Ø 18 cm · H 10 cm',
    priceFrom: 70,
    image: '/images/products/intense.jpg',
    gallery: ['/images/products/intense.jpg', '/images/editorial/gallery-texture.jpg', '/images/editorial/gallery-preparation.jpg'],
    tags: ['anniversaire', 'chocolat', 'evenement'],
    available: true,
    availableFrom: 'Sous 48 h',
    storage: 'Au réfrigérateur 4 jours. Température ambiante 20 minutes avant service.',
    detail:
      'Le praliné est torréfié et broyé chaque semaine à l’atelier ; la spirale de ganache est dressée à la spatule, sans poche, pour garder sa texture dense.',
  },
  {
    slug: 'eclat',
    name: 'Éclat',
    tagline: 'Citron / Fruits rouges',
    description:
      'La fraîcheur d’un crémeux citron de Menton, adoucie par une crème mascarpone et réveillée par un insert de fruits rouges acidulés. Fini d’un glaçage ivoire mat.',
    composition: ['Biscuit citron', 'Crémeux citron de Menton', 'Crème mascarpone', 'Insert fruits rouges'],
    allergens: ['Gluten', 'Œufs', 'Lait'],
    persons: '6–8 personnes',
    dimensions: 'Ø 18 cm · H 9 cm',
    priceFrom: 65,
    image: '/images/products/eclat.jpg',
    gallery: ['/images/products/eclat.jpg', '/images/editorial/gallery-full-cake.jpg', '/images/editorial/gallery-detail.jpg'],
    tags: ['anniversaire', 'fruits'],
    available: true,
    availableFrom: 'Sous 72 h',
    storage: 'Au réfrigérateur 3 jours. Servir frais mais non glacé.',
    detail:
      'Les agrumes sont zestés à la main le jour même ; le glaçage mat est coulé à 32 °C exactement pour obtenir cette surface sans reflet.',
  },
  {
    slug: 'aube',
    name: 'Aube',
    tagline: 'Vanille / Praliné',
    description:
      'Notre pièce d’anniversaire : une vague de crème vanille sculptée à la spatule, un cœur praliné, et une unique bougie de bronze pour toute lumière.',
    composition: ['Biscuit vanille', 'Crème vanille de Madagascar', 'Cœur praliné', 'Vague sculptée main'],
    allergens: ['Gluten', 'Œufs', 'Lait', 'Fruits à coque'],
    persons: '10–12 personnes',
    dimensions: 'Ø 22 cm · H 10 cm',
    priceFrom: 93,
    image: '/images/products/aube.jpg',
    gallery: ['/images/products/aube.jpg', '/images/editorial/hero-cake.jpg', '/images/editorial/gallery-preparation.jpg'],
    tags: ['anniversaire', 'enfant'],
    available: true,
    availableFrom: 'Sous 72 h',
    storage: 'Au réfrigérateur 3 jours.',
    detail:
      'La vague est sculptée en une seule passe, à la spatule coudée : aucune retouche n’est possible, c’est la signature de la pièce.',
  },
  {
    slug: 'voilage',
    name: 'Voilage',
    tagline: 'Amande / Mangue passion',
    description:
      'Deux étages d’amande et de mangue passion, drapés d’une crème mascarpone aux plis réguliers comme une étoffe. Pensée pour les mariages et grandes tables.',
    composition: ['Biscuit amande', 'Crème mascarpone', 'Insert mangue passion', 'Drapage deux étages'],
    allergens: ['Gluten', 'Œufs', 'Lait', 'Fruits à coque'],
    persons: '25+ personnes',
    dimensions: 'Ø 22 / Ø 15 cm · H 24 cm',
    priceFrom: 235,
    image: '/images/events/mariage.jpg',
    gallery: ['/images/events/mariage.jpg', '/images/editorial/gallery-full-cake.jpg', '/images/editorial/gallery-packaging.jpg'],
    tags: ['mariage', 'fruits'],
    available: true,
    availableFrom: 'Sur commande 3 semaines avant',
    storage: 'Au réfrigérateur 2 jours. Montage sur place possible.',
    detail:
      'Les plis du drapage sont tirés un à un au peigne fin ; la structure interne permet un transport sûr jusqu’au lieu de réception.',
  },
  {
    slug: 'nuage',
    name: 'Nuage',
    tagline: 'Vanille / Mascarpone',
    description:
      'Un format intime, d’une douceur absolue : biscuit vanille, crème mascarpone et perles nacrées déposées une à une. Pour les premiers anniversaires et les baby showers.',
    composition: ['Biscuit vanille', 'Crème mascarpone', 'Perles nacrées', 'Finition velours'],
    allergens: ['Gluten', 'Œufs', 'Lait'],
    persons: '4 personnes',
    dimensions: 'Ø 14 cm · H 8 cm',
    priceFrom: 55,
    image: '/images/products/nuage.jpg',
    gallery: ['/images/products/nuage.jpg', '/images/editorial/gallery-detail.jpg', '/images/editorial/gallery-packaging.jpg'],
    tags: ['enfant', 'anniversaire'],
    available: false,
    availableFrom: 'De retour le 12 octobre',
    storage: 'Au réfrigérateur 2 jours.',
    detail:
      'La finition velours est pulvérisée à −18 °C pour obtenir ce grain mat et doux, sans aucun colorant azoïque.',
  },
];

export const PRODUCT_FILTERS = [
  { id: 'tous', label: 'Tous' },
  { id: 'anniversaire', label: 'Anniversaire' },
  { id: 'mariage', label: 'Mariage' },
  { id: 'chocolat', label: 'Chocolat' },
  { id: 'fruits', label: 'Fruits' },
  { id: 'enfant', label: 'Enfant' },
  { id: 'evenement', label: 'Événement' },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
