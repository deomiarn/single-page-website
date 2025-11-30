import { Sparkle } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Testimonial20 = () => {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-center mb-12">Das sagen unsere Kunden</h2>
        <div className="relative grid border border-dashed md:grid-cols-2">
          <div className="border-dashed px-6 py-12 md:border-r md:px-12 md:py-16 bg-card">
            <p className="mb-6 text-center font-medium md:text-xl">
              &quot;Die Räumung der Wohnung meiner verstorbenen Mutter war für mich sehr belastend. Das Team war
              <strong className="ml-1 font-bold">
                unglaublich einfühlsam und professionell.&quot;
              </strong>
            </p>
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <Avatar className="size-14 rounded-full border bg-primary/10">
                <AvatarFallback className="text-primary font-semibold">MK</AvatarFallback>
              </Avatar>
              <p className="text-center font-medium md:text-left">
                M. Keller, Bülach
              </p>
            </div>
          </div>
          <div className="px-6 py-12 text-center md:px-12 md:py-16 bg-card">
            <p className="mb-6 text-center font-medium md:text-xl">
              &quot;Pünktlich, zuverlässig und
              <strong className="mx-1 font-bold">absolut fair im Preis.</strong>
              Die Wohnung wurde besenrein übergeben. Kann ich nur empfehlen!&quot;
            </p>
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <Avatar className="size-14 rounded-full border bg-primary/10">
                <AvatarFallback className="text-primary font-semibold">PW</AvatarFallback>
              </Avatar>
              <p className="text-center font-medium md:text-left">
                P. Weber, Regensdorf
              </p>
            </div>
          </div>
          <Sparkle
            strokeWidth={1}
            className="fill-primary absolute -left-[9px] -top-[9px] size-4"
          />
          <Sparkle
            strokeWidth={1}
            className="fill-primary absolute -right-2 -top-2 size-4"
          />
          <Sparkle
            strokeWidth={1}
            className="fill-primary absolute -bottom-2 -right-2 size-4"
          />
          <Sparkle
            strokeWidth={1}
            className="fill-primary absolute -bottom-2 -left-2 size-4"
          />
        </div>
      </div>
    </section>
  );
};

export { Testimonial20 };
