import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
}

const Contact2 = ({
  title = "Contact Us",
  description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
  phone = "(123) 34567890",
  email = "email@example.com",
  web = { label: "shadcnblocks.com", url: "https://shadcnblocks.com" },
}: Contact2Props) => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h2 className="mb-2 lg:mb-1">
                {title}
              </h2>
              <p>{description}</p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center lg:text-left">
                Kontaktdaten
              </h3>
              <ul className="ml-4 list-disc">
                <li>
                  <span className="font-bold">Telefon: </span>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="underline">
                    {phone}
                  </a>
                </li>
                <li>
                  <span className="font-bold">E-Mail: </span>
                  <a href={`mailto:${email}`} className="underline">
                    {email}
                  </a>
                </li>
                <li>
                  <span className="font-bold">Web: </span>
                  <a href={web.url} target="_blank" className="underline">
                    {web.label}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-card mx-auto flex max-w-3xl flex-col gap-6 rounded-lg border p-10">
            <div className="flex gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstname">Vorname</Label>
                <Input type="text" id="firstname" placeholder="Ihr Vorname" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastname">Nachname</Label>
                <Input type="text" id="lastname" placeholder="Ihr Nachname" />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="phone">Telefon</Label>
              <Input type="tel" id="phone" placeholder="Ihre Telefonnummer" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="objecttype">Objektart</Label>
              <Input type="text" id="objecttype" placeholder="z.B. Wohnung, Haus, Keller" />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Nachricht</Label>
              <Textarea placeholder="Beschreiben Sie kurz Ihr Anliegen..." id="message" />
            </div>
            <Button className="w-full">Anfrage senden</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact2 };
