import { Exo_2, Poppins } from "next/font/google";
import "./globals.css";
import { IntroContainer } from "@/components/custom/sub-intro/intro-container";
import { MainContainer } from "@/components/custom/main/main-container";
import { TechGridBackground } from "@/components/custom/layout/tech-grid-background";
import { FloatingDock } from "@/components/custom/nav/dock";
import { BorderBeam } from "@/components/magicui/border-beam";
import { navLink } from "@/data/nav-link";

const poppins = Poppins({
  weight: ["100", "200", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const exo2 = Exo_2({
  weight: ["100", "200", "400", "500", "600", "700"],
  variable: "--font-exo2",
  subsets: ["latin"],
});

export const metadata = {
  title: "Md Tuhin Hasnat | CSE Student & Problem Solver",
  description: "Official website of Md Tuhin Hasnat – Computer Engineering Student, Competitive Programming Trainer, and Tech Enthusiast.",
  keywords: ["Md Tuhin Hasnat", "Software Engineer", "Competitive Programming", "Portfolio", "Next.js", "Instructor"],
  metadataBase: new URL("https://me.mdtuhinhasnat.top"),
  openGraph: {
    title: "Md Tuhin Hasnat | CSE Student & Problem Solver",
    description: "Explore my portfolio, projects, and training work in competitive programming and software development.",
    url: "https://me.mdtuhinhasnat.top",
    siteName: "Md Tuhin Hasnat",
    images: [
      {
        url: "https://me.mdtuhinhasnat.top/og-image.png",
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
    description: "Explore my portfolio, projects, and training work in competitive programming and software development.",
    creator: "@MDTuhinhasnat1",
    images: ["https://me.mdtuhinhasnat.top/og-image.png"],
  }
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${exo2.className} antialiased`}>
        <TechGridBackground>
          <div className="flex items-center justify-center min-h-screen p-4 lg:p-8">
            <section className="relative w-full max-w-[1400px] flex flex-col lg:flex-row lg:gap-2 p-1 rounded-2xl overflow-visible">
              <BorderBeam size={800} duration={20} colorFrom="hsl(var(--primary))" colorTo="hsl(var(--secondary))" borderWidth={2} className="z-20 hidden lg:block" />
              <IntroContainer />
              <MainContainer>
                {children}
              </MainContainer>
              <FloatingDock navLinks={navLink} />
            </section>
          </div>
        </TechGridBackground>
      </body>
    </html>
  );
}
