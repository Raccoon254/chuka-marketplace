import { Figtree } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from '@/app/components/AuthProvider'
import NotificationProvider from '@/app/components/notificationProvider'

const inter = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Chuka Marketplace",
  description: "Chuka Marketplace is a web application that allows users to buy and sell second-hand items. The platform is designed to showcase a wide variety of items, making it easy for buyers to find what they need and for sellers to reach a broader audience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
        <title>{metadata.title}</title>
    </head>
    <body className={inter.className}>
    <NextAuthProvider>
        <NotificationProvider>{children}</NotificationProvider>
    </NextAuthProvider>
    <script src="/icons/fontawesome.js" crossOrigin="anonymous"></script>
    </body>
    </html>
  );
}
