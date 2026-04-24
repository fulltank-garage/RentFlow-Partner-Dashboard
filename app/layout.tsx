import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

import Providers from "./providers";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RentFlow ศูนย์จัดการร้าน",
  description: "หลังบ้านสำหรับเจ้าของร้านเช่ารถ จัดการร้าน รถ การจอง และลูกค้า",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={notoSansThai.variable}>
      <body className="font-thai">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
