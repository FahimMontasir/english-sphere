import "./globals.css";
import { Saira_Condensed } from "next/font/google";

const saira = Saira_Condensed({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-saira",
});

export const metadata = {
  title: "Refactor Speaking English App",
  description:
    "This is the showcase web for Refactor Speaking English app which is developed and all rights reserved by Fahim Montasir (Full Stack web developer)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${saira.variable} h-screen overflow-x-hidden bg-bgwhite dark:bg-bgblack`}
    >
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
