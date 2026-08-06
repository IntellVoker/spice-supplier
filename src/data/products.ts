export interface Product {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  origin: string;
  packaging: string;
  moq: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 'turmeric',
    name: 'Turmeric (Kunyit)',
    scientificName: 'Curcuma longa',
    image: '/images/products/Turmeric.jpg',
    origin: 'Java & Lampung, Indonesia',
    packaging: '25 kg / 50 kg woven bags, or vacuum-sealed packs based on buyer requirements.',
    moq: 'Subject to confirmation',
    featured: true,
  },
  {
    id: 'ginger',
    name: 'Ginger (Jahe)',
    scientificName: 'Zingiber officinale',
    image: '/images/products/Ginger.jpg',
    origin: 'Java & Sumatra, Indonesia',
    packaging: '20 kg cartons for fresh, 25 kg bags for dried — customizable on request.',
    moq: 'Subject to confirmation',
  },
  {
    id: 'cinnamon',
    name: 'Cinnamon (Kayu Manis)',
    scientificName: 'Cinnamomum burmannii',
    image: '/images/products/Cinnamon_(1).png',
    origin: 'Kerinci, Jambi, Indonesia',
    packaging: '25 kg cartons or custom packaging based on buyer requirements.',
    moq: 'Subject to confirmation',
  },
  {
    id: 'clove',
    name: 'Clove (Cengkeh)',
    scientificName: 'Syzygium aromaticum',
    image: '/images/products/Clove_(1).png',
    origin: 'Maluku & North Sulawesi, Indonesia',
    packaging: '25 kg woven bags or vacuum-sealed, customizable on request.',
    moq: 'Subject to confirmation',
  },
  {
    id: 'nutmeg',
    name: 'Nutmeg (Pala)',
    scientificName: 'Myristica fragrans',
    image: '/images/products/Nutmeg_(1).png',
    origin: 'Banda Islands & North Maluku, Indonesia',
    packaging: '25 kg cartons or vacuum-sealed, customizable on request.',
    moq: 'Subject to confirmation',
  },
  {
    id: 'moringa',
    name: 'Moringa (Kelor)',
    scientificName: 'Moringa oleifera',
    image: '/images/products/Moringa_(1).png',
    origin: 'NTT & East Java, Indonesia',
    packaging: '25 kg foil-lined bags or custom packaging based on buyer requirements.',
    moq: 'Subject to confirmation',
  },
];
