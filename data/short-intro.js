import { platform } from "os";
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaWhatsapp 
} from "react-icons/fa6";

export const shortIntro = {
  name: "Md. Tuhin Hasnat",
  role: "Engr. Student, Problem Solver",
  image: "/hasnat.png",
  social: [
    {
      name: "+880 1318 440994",
      link: "whatsapp://send?phone=+8801318440994",
      Icon: FaWhatsapp,
      platform : "whatsapp",
    },
    {
      name:"mdtuhinhasnat@gmail.com",
      link: "mailto:mdtuhinhasnat@gmail.com",
      Icon: FaEnvelope,
      platform : "email",
    },
    {
      name: "in/mdtuhinhasnat",
      link: "https://www.linkedin.com/in/mdtuhinhasnat",
      Icon: FaLinkedin,
      platform : "linkedin",
    },
    {
      name: "md-tuhin-hasnat",
      link: "https://github.com/md-tuhin-hasnat",
      Icon: FaGithub,
      platform : "github",
    },
    {
      name: "hlwhasnat",
      link: "https://www.facebook.com/hlwhasnat",
      Icon: FaFacebook,
      platform : "facebook",
    },
  ]
}