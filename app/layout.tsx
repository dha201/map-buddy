/**
 * Root Layout
 */

import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter } from "next/font/google";
import { AuthProvider } from '@/app/hooks/useAuth';
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  display: 'swap',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-ibmplexsans',
});

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Date Buddy",
  description: "Help you find the perfect date",
  icons: {
    icon: "/static/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSans.variable}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
