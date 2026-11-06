import type { Locale } from '../i18n/config';

/**
 * Published company facts. `formEndpoint` stays null until a form
 * backend is chosen; the contact form then shows a "not connected" notice.
 * WhatsApp is unpublished. Company registration, founding year and which
 * office is headquarters are still unknown (see the About page).
 */
export const SITE = {
  brand: 'WHALEOX',
  legalNameZh: '鲸牛计算机',
  legalNameEn: 'WHALEOX Computer',
  domain: 'whaleox.com',
  email: 'contact@whaleox.com',
  /** Shown as written; `tel` is the E.164 target for the link. */
  phones: [
    { display: '0086-18525584766', tel: '+8618525584766' },
    { display: '00243-897510006', tel: '+243897510006' },
  ],
  whatsapp: null as string | null,
  /** POST endpoint for the contact form (e.g. Formspree, a Worker). */
  formEndpoint: null as string | null,
  offices: {
    zh: [
      { label: '金沙萨办公室', address: '刚果民主共和国金沙萨市贡贝区 Colonel Tshatshi' },
      { label: '卢本巴希办公室', address: '刚果民主共和国卢本巴希市高尔夫路' },
      { label: '大连办公室', address: '大连高新区礼贤街1号' },
    ],
    fr: [
      { label: 'Bureau de Kinshasa', address: 'Colonel Tshatshi, Gombe, Kinshasa, République démocratique du Congo' },
      { label: 'Bureau de Lubumbashi', address: 'Route du Golf, Lubumbashi, République démocratique du Congo' },
      { label: 'Bureau de Dalian', address: 'N° 1, rue Lixian, zone de haute technologie de Dalian, Chine' },
    ],
    en: [
      { label: 'Kinshasa office', address: 'Colonel Tshatshi, Gombe, Kinshasa, Democratic Republic of the Congo' },
      { label: 'Lubumbashi office', address: 'Route du Golf, Lubumbashi, Democratic Republic of the Congo' },
      { label: 'Dalian office', address: 'No. 1 Lixian Street, Dalian High-tech Zone, China' },
    ],
  } satisfies Record<Locale, { label: string; address: string }[]>,
  /** Figures published on the previous whaleox.com. */
  stats: {
    projects: 20,
    roads: 10,
  },
};
