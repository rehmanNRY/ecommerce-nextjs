import { Inter } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Zoobabuy - Buy your goods",
  description: "Online platform to buy your goods",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavbarWrapper />
        <div className="md:pt-[155px] pt-[137px]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
