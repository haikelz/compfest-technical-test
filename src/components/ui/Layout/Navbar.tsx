import { useUser } from "@clerk/clerk-react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import clsx from "clsx";
import { Navbar as FlowbiteNavbar } from "flowbite-react";
import { useAtom } from "jotai";
import { Link, useLocation } from "react-router-dom";
import { useScroll, useTheme } from "../../../hooks";
import { isOpenModalAtom } from "../../../store";
import Image from "../Image";

const linkList = [
  {
    id: 1,
    name: "Home",
    route: "/",
  },
  {
    id: 2,
    name: "Saved Movies",
    route: "/saved-movies",
  },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { user } = useUser();

  const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [theme, setTheme] = useTheme();

  const scroll = useScroll();

  return (
    <FlowbiteNavbar
      className={clsx(
        "sticky top-0 z-10 w-full bg-white/80 backdrop-blur-md",
        "dark:bg-gray-900/80",
        scroll > 100 ? "border-b-[1.5px]" : ""
      )}
    >
      <Link to="/">
        <div className="flex items-center justify-center space-x-2">
          <Image src="/img/logo.png" alt="logo" className="h-9 w-9" />
          <h1 className="text-2xl font-bold tracking-wide">Moviesin</h1>
        </div>
      </Link>
      <ul className="hidden items-center justify-center space-x-8 md:flex">
        {linkList.map((item) => (
          <li key={item.id}>
            <Link
              className={clsx(
                "dark:text-gray-200",
                pathname === item.route
                  ? "font-bold text-black underline underline-offset-4"
                  : "font-medium"
              )}
              to={item.route}
            >
              {item.name}
            </Link>
          </li>
        ))}
        <li>
          <button
            type="button"
            aria-label="open modal"
            onClick={() => setIsOpenModal(!isOpenModal)}
            className="h-10 w-10 rounded-full border-2 border-cyan-600"
          >
            <Image src={user?.profileImageUrl as string} alt="" className="rounded-full" />
          </button>
        </li>
        <li>
          <button
            className="rounded-full dark:bg-gray-800"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <IconSun /> : <IconMoon />}
          </button>
        </li>
      </ul>
    </FlowbiteNavbar>
  );
}
