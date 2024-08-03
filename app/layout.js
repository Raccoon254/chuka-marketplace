import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from '@/app/components/AuthProvider'
import NotificationProvider from '@/app/components/notificationProvider'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NextAuthProvider>
        <NotificationProvider>{children}</NotificationProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
