import { ChildrenProps } from "../../../types";
import Navbar from "./Navbar";

export default function Layout({ children }: ChildrenProps) {
  return (
    <>
      <Navbar />
      <div className="w-full flex items-center min-h-screen flex-col p-4">
        {children}
      </div>
      <footer className="flex mt-10 justify-center items-center p-4">
        <div>
          <p className="font-bold text-base tracking-wide">
            2020-2023 Moviesin
          </p>
        </div>
      </footer>
    </>
  );
}
