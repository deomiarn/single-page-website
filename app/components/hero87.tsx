import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const Hero87 = () => {
  return (
    <section className="py-20">
      <div className="container">
        <h1>
          Sorgenfreie Wohnungsräumung im Zürcher Unterland
        </h1>
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <p>
              Diskreter, schneller und umweltfreundlicher Service mit Festpreisgarantie.
              Von der kompletten Haushaltsauflösung bis zur besenreinen Übergabe –
              wir kümmern uns um alles. Ihr lokales Familienunternehmen aus Dielsdorf.
            </p>
            <Button size="lg" className="mt-12" asChild>
              <a href="#kontakt">
                Gratis Besichtigungstermin
                <ArrowRight className="ml-2 h-auto w-4" />
              </a>
            </Button>
          </div>
          <div className="relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 -top-1 -z-10 mx-auto h-full w-full max-w-3xl bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] bg-[size:56px_56px] opacity-15 [mask-image:radial-gradient(ellipse_50%_100%_at_50%_50%,#000_60%,transparent_100%)]"></div>
            <Image
              src="/hero_image.webp"
              alt="Saubere, leere Wohnung nach professioneller Räumung"
              width={800}
              height={600}
              className="max-h-[400px] w-auto rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero87 };
