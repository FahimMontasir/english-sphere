import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ES Dashboard",
  description: "English Sphere Dashboard",
  authors: [{ name: "Fahim Montasir", url: "https://moontasir.web.app/" }],
  keywords:
    "ES Dashboard, English Sphere Dashboard, English Sphere content center",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
