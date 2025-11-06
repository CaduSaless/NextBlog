
import "./globals.css";
import { MainLayout } from '@/components/mainLayout';
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={'antialiased'}
      >
        {/* MainLayout é onde é feito o Header e Footer */ }
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
