import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// Configuramos Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap", // Mejora la carga visual de la fuente
});

export const metadata: Metadata = {
  title: "Gestor de Actividades",
  description: "Dashboard para la gestión de actividades",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      // Inyectamos la variable CSS de Montserrat en todo el HTML
      className={`${montserrat.variable} h-full antialiased`}
    >
      {/* Añadimos font-sans para que Tailwind la detecte */}
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}