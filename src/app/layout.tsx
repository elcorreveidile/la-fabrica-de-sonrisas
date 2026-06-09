import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DemoBanner from "@/components/layout/DemoBanner";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "La Fábrica de Sonrisas — Clínica Dental en Granada",
    template: "%s | La Fábrica de Sonrisas",
  },
  description:
    "Clínica dental en el Realejo, Granada. Odontología integrativa y mínimamente invasiva. Especialistas en pacientes con miedo al dentista. Premio Nacional Salud Bucodental 2022.",
  keywords: ["dentista Granada", "clínica dental Realejo", "ortodoncia Granada", "implantes Granada", "miedo dentista"],
  robots: { index: false, follow: false },
  openGraph: {
    title: "La Fábrica de Sonrisas — Clínica Dental en Granada",
    description: "Odontología integrativa y mínimamente invasiva en el Realejo, Granada.",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${nunito.variable} h-full`}>
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              name: "La Fábrica de Sonrisas",
              description: "Clínica dental de odontología integrativa en Granada",
              address: {
                "@type": "PostalAddress",
                streetAddress: "C. Molinos 34",
                addressLocality: "Granada",
                postalCode: "18009",
                addressCountry: "ES",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 37.176,
                longitude: -3.5984,
              },
              telephone: "958-XXX-XXX",
              openingHours: "Mo-Fr 09:30-18:30",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fdf8f3] antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <DemoBanner />
      </body>
    </html>
  );
}
