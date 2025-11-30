"use client";

import { CheckCircle, Leaf, Banknote } from "lucide-react";

const Feature152 = () => {
  const trustBadges = [
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Besenrein-Garantie",
      description: "Übergabe in einwandfreiem Zustand garantiert",
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "100% Recycling",
      description: "Umweltfreundliche Entsorgung aller Materialien",
    },
    {
      icon: <Banknote className="h-8 w-8 text-primary" />,
      title: "Festpreis",
      description: "Keine versteckten Kosten, transparente Preise",
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-3">
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="flex gap-4 p-6 rounded-lg bg-background border border-border"
            >
              <div className="shrink-0 p-3 rounded-full bg-primary/10 h-fit">
                {badge.icon}
              </div>
              <div>
                <h3 className="mb-2">{badge.title}</h3>
                <p>{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature152 };
