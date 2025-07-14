import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import StoreInitializer from "./StoreInitializer";
import { getServerSession } from "./_utils/auth";
import "../app/globalStyles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce App",
  description: "E-Commerce app with DummyJSON API",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreInitializer session={session} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
