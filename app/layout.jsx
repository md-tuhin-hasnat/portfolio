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
  title: "Md Tuhin Hasnat",
  description: "CSE student with experience as a Competitive Programming Instructor and Teaching Assistant. Passionate about learning new technologies and sharing knowledge. Quick learner and team player seeking a full-time software development position.Participated in prestigious competitive contests like ICPC Dhaka Regional Final for 2 times, NCPC, and various IUPC across the country.Experienced in data structures, and algorithms. Proficient in JavaScript, Python, and C++. Familiar with React, Node.js, MySQL, and MongoDB.",
};

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
