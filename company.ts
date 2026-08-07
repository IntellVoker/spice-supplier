// Single source of truth for company identity (NAP data). The index.html JSON-LD
// and the request-quotation function's COMPANY_* environment variables must match.
export const company = {
  name: 'Spice Supplier Indonesia',
  tagline: 'Premium Spices • Trusted Worldwide',
  logo: '/WhatsApp_Image_2026-07-09_at_11.58.39.jpeg',
  email: 'spicesupplierindonesia@gmail.com',
  phone: '+62 851 6117 0335',
  whatsapp: '6285161170335',
  address: 'Jl. KH. Abdul Hamid, Ploso, Kec. Wonoayu, Kab. Sidoarjo, Prov. Jawa Timur, Indonesia 61261',
  mapsQuery: 'Sidoarjo, East Java, Indonesia',
  aboutImage: '/images/about/Generated_Image_July_24,_2026_-_9_31AM copy.png',
  socials: {
    linkedin: '#',
    instagram: '#',
    facebook: '#',
  },
};

export type Company = typeof company;
