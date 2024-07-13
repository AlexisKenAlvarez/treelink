"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
  const socials = [
    {
      title: "Github",
      icon: FaGithub,
      link: "https://github.com/AlexisKenAlvarez",
    },

    {
      title: "Linkedin",
      icon: FaLinkedin,
      link: "https://www.linkedin.com/in/alexiskenalvarez/",
    },
    {
      title: "Instagram",
      icon: FaSquareInstagram,
      link: "https://www.instagram.com/alexiskenalvarez/",
    },
  ];

  return (
    <footer className="mx-auto max-w-screen-xl p-4 mt-5 md:flex-row-reverse flex-col gap-3 flex items-center justify-between text-black">
      <div className="flex gap-3">
        {socials.map((social) => (
          <Link href={social.link} key={social.title} target="_blank">
            <social.icon size={18} className="opacity-50 transition-all ease-in-out duration-300 hover:opacity-100 hover:scale-[1.1]" />
          </Link>
        ))}
      </div>
      <p className="text-center text-xs opacity-60">© 2021 - 2024 Alexis Ken Alvarez. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
