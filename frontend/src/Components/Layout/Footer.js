import React from "react";
import FacebookLogo from "../../Assets/Svg/FacebookLogo";
import YoutubeLogo from "../../Assets/Svg/YoutubeLogo";
import TwitterLogo from "../../Assets/Svg/TwitterLogo";
import LinkedinLogo from "../../Assets/Svg/LinkedinLogo";
import InstagramLogo from "../../Assets/Svg/InstagramLogo";

const socials = [
  {
    id: 1,
    logo: <FacebookLogo />,
    link: "https://facebook.com/",
  },
  {
    id: 2,
    logo: <YoutubeLogo />,
    link: "https://youtube.com/",
  },
  {
    id: 3,
    logo: <TwitterLogo />,
    link: "https://twitter.com/",
  },
  {
    id: 4,
    logo: <LinkedinLogo />,
    link: "https://linkedin.com/",
  },
  {
    id: 5,
    logo: <InstagramLogo />,
    link: "https://instagram.com/",
  },
];

const Footer = () => {
  return (
    <footer className="bg-colorWhite mt-auto">
      <div className="py-5 border-t">
        <div className="text-center">
          <span className="text-[#eb4034]"> Ecommerce </span> - © 2022 All
          Rights Reserved
        </div>
        <ul className="flex justify-center flex-wrap mt-2 sm:mt-4">
          {socials &&
            socials.map((social) => (
              <li
                key={social.id}
                className="hover:bg-[#E8E8FF] p-4 rounded-xl transition-colors duration-300 footer-link"
              >
                <div className="w-5 h-5">
                  <a href={social.link} target="_blank" rel="noreferrer">
                    {social.logo}
                  </a>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
