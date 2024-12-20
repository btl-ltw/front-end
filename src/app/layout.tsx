import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from '@/resource/components/nav';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "WebToon",
  description: "A web for reading comics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  
      <>
          <html>
              <body>
                  {children}
              </body>
          </html>
      
    </>
      
      
    
  );
}
