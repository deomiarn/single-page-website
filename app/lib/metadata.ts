import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

const BASE_URL = 'https://realecontinental.ch';

type PageType = 'home' | 'about' | 'services' | 'contact' | 'impressum' | 'datenschutz';

interface MetadataConfig {
  path: string;
  noIndex?: boolean;
}

const pageConfigs: Record<PageType, MetadataConfig> = {
  home: { path: '' },
  about: { path: '/about' },
  services: { path: '/services' },
  contact: { path: '/contact' },
  impressum: { path: '/impressum', noIndex: true },
  datenschutz: { path: '/datenschutz', noIndex: true },
};

export async function generatePageMetadata(
  page: PageType,
  locale: string
): Promise<Metadata> {
  const config = pageConfigs[page];
  const t = await getTranslations('metadata');

  const canonicalPath = `/${locale}${config.path}`;

  return {
    title: t(`${page}.title`),
    description: t(`${page}.description`),
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
      languages: {
        de: `${BASE_URL}/de${config.path}`,
        en: `${BASE_URL}/en${config.path}`,
        'x-default': `${BASE_URL}/de${config.path}`,
      },
    },
    openGraph: {
      title: t(`${page}.title`),
      description: t(`${page}.description`),
      url: `${BASE_URL}${canonicalPath}`,
      siteName: t('siteName'),
      locale: locale === 'de' ? 'de_CH' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/Logos/OG-Logo.png`,
          width: 1200,
          height: 630,
          alt: 'Reale Continental GmbH',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t(`${page}.title`),
      description: t(`${page}.description`),
      images: [`${BASE_URL}/Logos/OG-Logo.png`],
    },
    robots: config.noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}
