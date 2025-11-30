import { Navbar } from "@/components/navbar";
import { Footer2 } from "@/components/footer2";

export default function DatenschutzPage() {
  return (
    <>
      <Navbar />
      <main className="py-20">
        <div className="container max-w-3xl">
          <h1 className="mb-8">Datenschutzerklärung</h1>

          <section className="space-y-6">
            <div>
              <h2 className="mb-4">1. Allgemeine Hinweise</h2>
              <p>
                Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen.
                Wir verarbeiten Ihre Daten daher ausschliesslich auf Grundlage der
                gesetzlichen Bestimmungen (DSG, DSGVO). In dieser Datenschutzerklärung
                informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung
                im Rahmen unserer Website.
              </p>
            </div>

            <div>
              <h2 className="mb-4">2. Verantwortliche Stelle</h2>
              <p className="text-foreground">
                Zürcher Unterland Räumungen<br />
                Musterstrasse 123<br />
                8157 Dielsdorf<br />
                Schweiz<br /><br />
                E-Mail: info@zuercher-raeumungen.ch<br />
                Telefon: +41 44 123 45 67
              </p>
            </div>

            <div>
              <h2 className="mb-4">3. Erhebung und Verarbeitung von Daten</h2>
              <p>
                Beim Besuch unserer Website werden automatisch Informationen allgemeiner
                Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die
                Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres
                Internet-Service-Providers und ähnliches.
              </p>
            </div>

            <div>
              <h2 className="mb-4">4. Kontaktformular</h2>
              <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre
                Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen
                Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
                Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne
                Ihre Einwilligung weiter.
              </p>
            </div>

            <div>
              <h2 className="mb-4">5. Cookies</h2>
              <p>
                Unsere Website verwendet keine Tracking-Cookies. Es werden lediglich
                technisch notwendige Cookies verwendet, die für den Betrieb der Website
                erforderlich sind.
              </p>
            </div>

            <div>
              <h2 className="mb-4">6. Ihre Rechte</h2>
              <p>
                Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung,
                Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch zu.
                Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das
                Datenschutzrecht verstösst, können Sie sich bei uns oder der
                zuständigen Aufsichtsbehörde beschweren.
              </p>
            </div>

            <div>
              <h2 className="mb-4">7. Kontakt</h2>
              <p>
                Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer
                personenbezogenen Daten, bei Auskünften, Berichtigung, Sperrung
                oder Löschung von Daten wenden Sie sich bitte an:<br /><br />
                <span className="text-foreground">
                  E-Mail: info@zuercher-raeumungen.ch<br />
                  Telefon: +41 44 123 45 67
                </span>
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mt-8">
                Stand: November 2024
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
