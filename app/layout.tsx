import type { Metadata } from "next";
import "./globals.css";
// components
import NavBar from "./components/NavBar/navbar";

export const metadata: Metadata = {
  title: "Findyourroof",
  description: "Hospitality services for anyone!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossOrigin=""/>
      </head>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
