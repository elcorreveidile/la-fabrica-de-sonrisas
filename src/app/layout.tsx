import type { Metadata } from "next";
import { Nunito, Poppins } from "next/font/google";
import localFont from "next/font/local";
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

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600"],
});

const openSans = localFont({
  src: "../../public/fonts/OpenSans-Regular.ttf",
  variable: "--font-open-sans",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Clínica Dental Ejemplo — Dentista de confianza",
    template: "%s | Clínica Dental Ejemplo",
  },
  description:
    "Clínica dental de ejemplo. Odontología integrativa y mínimamente invasiva. Especialistas en pacientes con miedo al dentista.",
  keywords: ["dentista", "clínica dental", "ortodoncia", "implantes", "miedo dentista"],
  robots: { index: false, follow: false },
  openGraph: {
    title: "Clínica Dental Ejemplo — Dentista de confianza",
    description: "Odontología integrativa y mínimamente invasiva. Web de demostración.",
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
    <html lang="es" className={`${nunito.variable} ${openSans.variable} ${poppins.variable} h-full`}>
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              name: "Clínica Dental Ejemplo",
              description: "Clínica dental de odontología integrativa. Web de demostración.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Calle Mayor 1",
                addressLocality: "Madrid",
                postalCode: "28013",
                addressCountry: "ES",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 40.4168,
                longitude: -3.7038,
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
