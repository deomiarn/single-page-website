import { Navbar } from "@/components/navbar";
import { Footer2 } from "@/components/footer2";

export default function ImpressumPage() {
  return (
    <>
      <Navbar />
      <main className="py-20">
        <div className="container max-w-3xl">
          <h1 className="mb-8">Impressum</h1>

          <section className="space-y-6">
            <div>
              <h2 className="mb-4">Angaben gemäss Art. 3 UWG</h2>
              <p className="text-foreground">
                Zürcher Unterland Räumungen<br />
                Musterstrasse 123<br />
                8157 Dielsdorf<br />
                Schweiz
              </p>
            </div>

            <div>
              <h3 className="mb-2">Kontakt</h3>
              <p className="text-foreground">
                Telefon: +41 44 123 45 67<br />
                E-Mail: info@zuercher-raeumungen.ch
              </p>
            </div>

            <div>
              <h3 className="mb-2">Vertretungsberechtigte Person</h3>
              <p className="text-foreground">
                Max Mustermann, Geschäftsführer
              </p>
            </div>

            <div>
              <h3 className="mb-2">Handelsregister</h3>
              <p className="text-foreground">
                Eingetragen im Handelsregister des Kantons Zürich<br />
                UID: CHE-123.456.789
              </p>
            </div>

            <div>
              <h3 className="mb-2">Mehrwertsteuernummer</h3>
              <p className="text-foreground">
                CHE-123.456.789 MWST
              </p>
            </div>

            <div>
              <h3 className="mb-2">Haftungsausschluss</h3>
              <p>
                Der Autor übernimmt keine Gewähr für die Richtigkeit, Genauigkeit,
                Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen.
                Haftungsansprüche gegen den Autor wegen Schäden materieller oder
                immaterieller Art, die aus dem Zugriff oder der Nutzung bzw.
                Nichtnutzung der veröffentlichten Informationen entstanden sind,
                werden ausgeschlossen.
              </p>
            </div>

            <div>
              <h3 className="mb-2">Urheberrechte</h3>
              <p>
                Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos
                oder anderen Dateien auf dieser Website gehören ausschliesslich
                Zürcher Unterland Räumungen oder den speziell genannten Rechtsinhabern.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer2
        companyName="Zürcher Unterland Räumungen"
        tagline="Ihr Partner für professionelle Räumungen im Zürcher Unterland"
        menuItems={[]}
        copyright="© 2024 Zürcher Unterland Räumungen. Alle Rechte vorbehalten."
        bottomLinks={[
          { text: "Impressum", url: "/impressum" },
          { text: "Datenschutz", url: "/datenschutz" },
        ]}
      />
    </>
  );
}
