import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const Feature119 = () => {
  return (
    <section id="ablauf" className="py-20 bg-secondary">
      <div className="container">
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-2.5">
            <Badge variant="outline">So einfach geht&apos;s</Badge>
            <h2 className="text-center">
              Unser Ablauf
            </h2>
          </div>
          <div className="grid gap-7 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
            <div className="flex gap-4">
              <span className="text-md bg-primary text-primary-foreground flex size-11 shrink-0 items-center justify-center rounded-full font-mono">
                01
              </span>
              <div className="flex flex-col gap-1">
                <h3>Besichtigung (Gratis)</h3>
                <p>
                  Wir kommen unverbindlich zu Ihnen vor Ort und begutachten die Räumlichkeiten.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-md bg-primary text-primary-foreground flex size-11 shrink-0 items-center justify-center rounded-full font-mono">
                02
              </span>
              <div className="flex flex-col gap-1">
                <h3>Offerte</h3>
                <p>
                  Sie erhalten innerhalb von 24 Stunden ein transparentes Festpreisangebot.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-md bg-primary text-primary-foreground flex size-11 shrink-0 items-center justify-center rounded-full font-mono">
                03
              </span>
              <div className="flex flex-col gap-1">
                <h3>Räumung & Übergabe</h3>
                <p>
                  Wir räumen termingerecht und übergeben die Räume besenrein.
                </p>
              </div>
            </div>
          </div>
          <Image
            src="/service_image.webp"
            alt="Professionelle Wohnungsräumung im Zürcher Unterland"
            width={1200}
            height={600}
            className="aspect-video w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { Feature119 };
