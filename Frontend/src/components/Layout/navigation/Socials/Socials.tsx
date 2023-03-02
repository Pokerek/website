import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import "./Socials.scss";

const SOCIALS = [
  {
    name: "Linkedin",
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/karol-chrobok/",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    link: "https://www.instagram.com/chrobok.dev/",
  },
  {
    name: "Github",
    icon: <FaGithub />,
    link: "https://github.com/Pokerek",
  },
];

export default function Socials() {
  return (
    <div className="socials">
      {SOCIALS.map((el) => (
        <a key={el.name} href={el.link} className="socials__icon">
          {el.icon}
        </a>
      ))}
    </div>
  );
}
