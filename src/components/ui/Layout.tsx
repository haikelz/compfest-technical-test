import { useClerk } from "@clerk/clerk-react";
import clsx from "clsx";
import { Button, Footer, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { ChildrenProps } from "../../types";

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

export default function Layout({ children }: ChildrenProps) {
  const { pathname } = useLocation();
  const { signOut } = useClerk();

  return (
    <>
      <Navbar className="border-b-[1.5px] z-10 w-full backdrop-blur-md bg-white/80 sticky top-0">
        <Link to="/">
          <h1 className="font-bold text-2xl">Moviesin</h1>
        </Link>
        <ul className="hidden md:flex justify-center items-center space-x-8">
          {linkList.map((item) => (
            <li>
              <Link
                className={clsx(
                  pathname === item.route
                    ? "underline underline-offset-2 font-bold"
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
      </Navbar>
      <div className="w-full flex items-center min-h-screen justify-center flex-col p-4">
        {children}
      </div>
      <Footer>
        <p>2023 Moviesin</p>
      </Footer>
    </>
  );
}
