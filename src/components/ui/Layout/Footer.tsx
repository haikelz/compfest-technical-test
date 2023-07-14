import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
} from "@tabler/icons-react";
import clsx from "clsx";
import { Link } from "react-router-dom";

const socialMediaList = [
  {
    id: 1,
    icon: IconBrandInstagram,
    link: "https://instagram.com",
  },
  { id: 2, icon: IconBrandLinkedin, link: "https://linkedin.com" },
  { id: 3, icon: IconBrandFacebook, link: "https://facebook.com" },
  { id: 4, icon: IconBrandTiktok, link: "https://tiktok.com" },
];

export default function Footer() {
  return (
    <footer
      className={clsx("mt-10 flex items-center justify-center", "bg-white p-4", "dark:bg-gray-900")}
    >
      <div className="flex flex-col items-center justify-center">
        <p className="text-base font-bold tracking-wide">2023 Moviesin</p>
        <ul className="mt-2 flex items-center justify-center space-x-5">
          {socialMediaList.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <Link to={item.link} target="_blank">
                  <button
                    type="button"
                    aria-label="social media"
                    className={clsx(
                      "flex h-10 w-10 items-center justify-center",
                      "rounded-full bg-gray-200 transition-all",
                      "dark:bg-gray-800",
                      "active:ring active:ring-gray-700"
                    )}
                  >
                    <Icon />
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
