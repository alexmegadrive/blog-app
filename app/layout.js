import "./globals.css";
import "../styles/globals.scss";
import { Layout } from "@/components";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextJS Blog App",
  description: "Blog platform with GraphQL support",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
