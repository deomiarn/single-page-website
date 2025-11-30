"use client";

import { Home, Trash2, Box, Building2 } from "lucide-react";

const Services4 = () => {
  const services = [
    {
      icon: <Home className="h-6 w-6" />,
      title: "Wohnungsräumung",
      description:
        "Komplette Haushaltsauflösung von A bis Z. Wir räumen Wohnungen, Häuser und Liegenschaften professionell und diskret.",
      items: ["Möbelentsorgung", "Hausrat räumen", "Besenreine Übergabe"],
    },
    {
      icon: <Trash2 className="h-6 w-6" />,
      title: "Entsorgung",
      description:
        "Fachgerechte und umweltfreundliche Entsorgung aller Materialien. Wir trennen, recyceln und entsorgen nachhaltig.",
      items: ["Sperrmüll abholen", "Elektroschrott", "Sondermüll"],
    },
    {
      icon: <Box className="h-6 w-6" />,
      title: "Kellerräumung",
      description:
        "Keller, Dachböden und Lagerräume räumen wir schnell und gründlich. Ideal für Vermieter und Liegenschaftsverwaltungen.",
      items: ["Keller entrümpeln", "Estrich räumen", "Lagerräume"],
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Firmenauflösung",
      description:
        "Professionelle Geschäftsauflösung für Büros, Werkstätten und Gewerbeobjekte. Diskret und termingerecht.",
      items: ["Büromöbel", "Lagerbestände", "Aktenvernichtung"],
    },
  ];

  return (
    <section id="leistungen" className="py-20">
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="space-y-4 text-center">
            <h2>
              Unsere Leistungen
            </h2>
            <p className="mx-auto max-w-2xl">
              Von der Wohnungsräumung bis zur Firmenauflösung – wir bieten alle
              Dienstleistungen aus einer Hand.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <div
                key={index}
                className="space-y-6 rounded-lg bg-secondary border border-border p-8 transition-shadow hover:shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-muted rounded-full p-3">
                    {service.icon}
                  </div>
                  <h3>{service.title}</h3>
                </div>
                <p>
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      <div className="bg-foreground h-1.5 w-1.5 rounded-full" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Services4 };
