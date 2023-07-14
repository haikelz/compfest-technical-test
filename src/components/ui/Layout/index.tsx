import clsx from "clsx";
import { useAtomValue } from "jotai";
import { isOpenModalAtom } from "../../../store";
import { ChildrenProps } from "../../../types";
import ModalUser from "../ModalUser";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: ChildrenProps) {
  const isOpenModal = useAtomValue(isOpenModalAtom);

  return (
    <div className={clsx("bg-white text-black", "dark:bg-gray-900 dark:text-gray-200")}>
      {isOpenModal ? <ModalUser /> : null}
      <Navbar />
      <div className="flex min-h-screen w-full flex-col items-center p-4">{children}</div>
      <Footer />
    </div>
  );
}
