import "./globals.css";

export const metadata = {
  title: "AURA | Luxury Interior Design & Architectural Atelier",
  description: "An international award-winning studio creating high-end residential estates, sky penthouses, and bespoke luxury hospitality environments worldwide.",
  keywords: ["Interior Design", "Luxury Penthouse", "Architectural Atelier", "Bespoke Furniture", "Sanity CMS"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=MonteCarlo&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0A0A0C] text-[#F7F5F0]">
        {children}
      </body>
    </html>
  );
}
