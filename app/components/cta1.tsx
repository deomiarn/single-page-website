import Image from "next/image";
import { ArrowRight, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Cta1 = () => {
  return (
    <section id="ueber-uns" className="py-20">
      <div className="container">
        <Card className="border-muted flex flex-col justify-between pb-0 md:flex-row md:py-6">
          <div className="p-6 md:max-w-lg">
            <div className="mb-2 flex items-center gap-2">
              <span className="bg-primary/10 flex size-7 items-center justify-center rounded-full">
                <Users className="size-4 text-primary" strokeWidth={1.5} />
              </span>
              <h4>Ihr lokales Familienunternehmen</h4>
            </div>
            <p className="mt-4">
              Seit über 15 Jahren sind wir im Zürcher Unterland für Sie da. Als Familienunternehmen
              aus Dielsdorf kennen wir die Region und ihre Menschen. Im Gegensatz zu anonymen
              Grossfirmen bieten wir persönlichen Service, faire Preise und absolute Diskretion –
              besonders bei sensiblen Situationen wie Erbfällen oder Räumungen nach einem Todesfall.
            </p>
            <Button className="mt-8" asChild>
              <a href="#kontakt">
                Jetzt anfragen <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
          </div>
          <Image
            src="/about_image.webp"
            alt="Zürcher Unterland Räumungen - Ihr lokales Familienunternehmen"
            width={600}
            height={400}
            className="aspect-video object-cover md:max-w-96 rounded-lg"
          />
        </Card>
      </div>
    </section>
  );
};

export { Cta1 };
