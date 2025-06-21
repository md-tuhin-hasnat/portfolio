import { Exo_2,Poppins } from "next/font/google";
import "./globals.css";
import { IntroContainer } from "@/components/custom/sub-intro/intro-container";
import { MainContainer } from "@/components/custom/main/main-container";
import WarpContainer from "@/components/custom/layout/warp-container"
const poppins = Poppins({
  weight: ["100","200","400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});
const exo2 = Exo_2({
  weight: ["100","200","400", "500", "600", "700"],
  variable: "--font-exo2",
  subsets: ["latin"],
});
export const metadata = {
  title: "Md Tuhin Hasnat | CSE Student & Problem Solver",
  description: "Official website of Md Tuhin Hasnat – Comuter Engineering Student, Competitive Programming Trainer, and Tech Enthusiast.",
  keywords: ["Md Tuhin Hasnat", "Software Engineer", "Competitive Programming", "Portfolio", "Next.js", "Instructor"],
  metadataBase: new URL("https://me.mdtuhinhasnat.top"),
  openGraph: {
    title: "Md Tuhin Hasnat | Software Developer & Instructor",
    description: "Explore my portfolio, projects, and teaching work in competitive programming and software development.",
    url: "https://me.mdtuhinhasnat.top",
    siteName: "Md Tuhin Hasnat",
    images: [
      {
        url: "https://me.mdtuhinhasnat.top/og-image.png", // Make a nice banner image
        width: 1200,
        height: 630,
        alt: "Md Tuhin Hasnat Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Tuhin Hasnat | CSE Student & Problem Solver",
    description: "Explore my portfolio, projects, and teaching work in competitive programming and software development.",
    creator: "@MDTuhinhasnat1", // optional
    images: ["https://me.mdtuhinhasnat.top/og-image.png"],
  }
}
export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
        <body
          className={`${exo2.className} antialiased`}
          >
          <WarpContainer>
            <section className="flex justify-center items-center w-svw h-svh">
              <section className="flex gap-2 justify-center w-full max-w-[1400px]">
                <IntroContainer />
                <MainContainer>
                  {children}
                </MainContainer>
              </section>
            </section>
        </WarpContainer>
      </body>
    </html>
  );
}
