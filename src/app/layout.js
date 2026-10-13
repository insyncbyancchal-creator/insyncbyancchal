import "./globals.css";

export const metadata = {
  title: "Insync Interiors | Luxury Architectural & Interior Design Atelier",
  description: "Bespoke architectural and interior design studio in Ludhiana, Punjab. Conceived from the ground up: light, proportion and quiet luxury.",
  keywords: ["Interior Design", "Architectural Atelier", "Insync Interiors", "Ludhiana", "Luxury Interiors", "Custom Decor", "Insync Home"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..800;1,6..96,400..600&family=MonteCarlo&family=Montserrat:ital,wght@0,300..700;1,300..500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FBF9F6] text-[#1A1A1A]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
