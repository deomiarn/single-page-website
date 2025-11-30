import { Navbar } from "@/components/navbar";
import { Hero87 } from "@/components/hero87";
import { Feature152 } from "@/components/feature152";
import { Services4 } from "@/components/services4";
import { Feature119 } from "@/components/feature119";
import { Cta1 } from "@/components/cta1";
import { Testimonial20 } from "@/components/testimonial20";
import { Contact2 } from "@/components/contact2";
import { Footer2 } from "@/components/footer2";

export default function HomePage() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero87 />

      {/* Trust Badges */}
      <Feature152 />

      {/* Services */}
      <Services4 />

      {/* Process Steps */}
      <Feature119 />

      {/* About Section */}
      <Cta1 />

      {/* Testimonials */}
      <Testimonial20 />

      {/* Contact Section */}
      <section id="kontakt">
        <Contact2
          title="Kontakt"
          description="Wir sind für Sie da. Vereinbaren Sie jetzt einen kostenlosen Besichtigungstermin!"
          phone="+41 44 123 45 67"
          email="info@zuercher-raeumungen.ch"
          web={{ label: "zuercher-raeumungen.ch", url: "#" }}
        />
      </section>

      {/* Footer */}
      <Footer2
        companyName="Zürcher Unterland Räumungen"
        tagline="Ihr Partner für professionelle Räumungen im Zürcher Unterland"
        menuItems={[
          {
            title: "Leistungen",
            links: [
              { text: "Wohnungsräumung", url: "#leistungen" },
              { text: "Entsorgung", url: "#leistungen" },
              { text: "Kellerräumung", url: "#leistungen" },
              { text: "Firmenauflösung", url: "#leistungen" },
            ],
          },
          {
            title: "Unternehmen",
            links: [
              { text: "Über uns", url: "#ueber-uns" },
              { text: "Kontakt", url: "#kontakt" },
            ],
          },
          {
            title: "Regionen",
            links: [
              { text: "Dielsdorf", url: "#" },
              { text: "Bülach", url: "#" },
              { text: "Regensdorf", url: "#" },
              { text: "Steinmaur", url: "#" },
            ],
          },
        ]}
        copyright="© 2024 Zürcher Unterland Räumungen. Alle Rechte vorbehalten."
        bottomLinks={[
          { text: "Impressum", url: "/impressum" },
          { text: "Datenschutz", url: "/datenschutz" },
        ]}
      />
    </>
  );
}
