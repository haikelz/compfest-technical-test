import { useClerk } from "@clerk/clerk-react";
import clsx from "clsx";
import { Button, Navbar as FlowbiteNavbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

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
  const { signOut } = useClerk();

  return (
    <FlowbiteNavbar className="border-b-[1.5px] z-10 w-full backdrop-blur-md bg-white/80 sticky top-0">
      <Link to="/">
        <h1 className="font-bold text-2xl">Moviesin</h1>
      </Link>
      <ul className="hidden md:flex justify-center items-center space-x-8">
        {linkList.map((item) => (
          <li key={item.id}>
            <Link
              className={clsx(
                pathname === item.route
                  ? "underline underline-offset-4 font-bold"
                  : "font-medium"
              )}
              to={item.route}
            >
              {item.name}
            </Link>
          </li>
        ))}
        <li>
          <Button className="font-bold" onClick={() => signOut()}>
            Logout
          </Button>
        </li>
      </ul>
    </FlowbiteNavbar>
  );
}
