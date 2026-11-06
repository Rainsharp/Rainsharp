/**
 * Company facts shown on the site. `null` renders as a visible
 * "to be confirmed" placeholder — the old whaleox.com published no
 * phone, email or address, so nothing here is guessed.
 */
export const SITE = {
  brand: 'WHALEOX',
  legalNameZh: '鲸牛计算机',
  legalNameEn: 'WHALEOX Computer',
  domain: 'whaleox.com',
  email: null as string | null,
  phone: null as string | null,
  whatsapp: null as string | null,
  addressDrc: null as string | null,
  addressChina: null as string | null,
  /** POST endpoint for the contact form (e.g. Formspree, a Worker). */
  formEndpoint: null as string | null,
  /** Figures published on the previous whaleox.com. */
  stats: {
    projects: 20,
    roads: 10,
  },
};
