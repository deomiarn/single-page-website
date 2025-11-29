interface StructuredDataProps {
  locale: string;
  page?: 'home' | 'about' | 'services' | 'contact' | 'impressum' | 'datenschutz';
}

const BASE_URL = 'https://realecontinental.ch';

export function StructuredData({ locale, page = 'home' }: StructuredDataProps) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Reale Continental GmbH',
    url: BASE_URL,
    logo: `${BASE_URL}/Logos/Logo-wordmark.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+41 76 420 97 60',
      contactType: 'customer service',
      availableLanguage: ['German', 'English'],
    },
    sameAs: [],
  };

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'AutoBodyShop',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'Reale Continental GmbH',
    description:
      locale === 'de'
        ? 'Professionelle Karosserie- und Frontscheibenreparatur in Dielsdorf. Direkte Versicherungsabrechnung.'
        : 'Professional bodywork and windshield repair in Dielsdorf. Direct insurance billing.',
    url: `${BASE_URL}/${locale}`,
    telephone: '+41 76 420 97 60',
    email: 'luigireale@hotmail.com',
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 47.48,
        longitude: 8.45,
      },
      geoRadius: '30000',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'de' ? 'Unsere Leistungen' : 'Our Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'de' ? 'Karosserieschäden' : 'Bodywork Repair',
            description:
              locale === 'de'
                ? 'Professionelle Reparatur von Blechschäden, Dellen und Unfallschäden'
                : 'Professional repair of body damage, dents, and accident damage',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'de' ? 'Frontscheibenreparatur' : 'Windshield Repair',
            description:
              locale === 'de'
                ? 'Steinschlagreparatur und Scheibenaustausch'
                : 'Chip repair and windshield replacement',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'de' ? 'Versicherungsabwicklung' : 'Insurance Claims',
            description:
              locale === 'de'
                ? 'Komplette Abwicklung mit direkter Versicherungsabrechnung'
                : 'Complete handling with direct insurance billing',
          },
        },
      ],
    },
  };

  const breadcrumbLabels: Record<string, Record<string, string>> = {
    de: {
      home: 'Startseite',
      about: 'Über uns',
      services: 'Leistungen',
      contact: 'Kontakt',
      impressum: 'Impressum',
      datenschutz: 'Datenschutz',
    },
    en: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      impressum: 'Imprint',
      datenschutz: 'Privacy Policy',
    },
  };

  const getBreadcrumb = () => {
    const items = [
      {
        '@type': 'ListItem',
        position: 1,
        name: breadcrumbLabels[locale]?.home || 'Home',
        item: `${BASE_URL}/${locale}`,
      },
    ];

    if (page !== 'home') {
      items.push({
        '@type': 'ListItem',
        position: 2,
        name: breadcrumbLabels[locale]?.[page] || page,
        item: `${BASE_URL}/${locale}/${page}`,
      });
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    };
  };

  const schemas = [organization, localBusiness, getBreadcrumb()];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
