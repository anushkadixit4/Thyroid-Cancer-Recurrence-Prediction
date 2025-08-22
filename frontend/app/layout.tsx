import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/contexts/user-context";
import { ErrorBoundary } from '@/components/error-boundary';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ThyroPredict - AI-Powered Thyroid Cancer Recurrence Prediction",
  description: "Empowering oncologists with cutting-edge AI to predict and prevent thyroid cancer recurrence.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ErrorBoundary>
          <UserProvider>
            {children}
          </UserProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
