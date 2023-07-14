import { useClerk, useUser } from "@clerk/clerk-react";
import Image from "./Image";
import clsx from "clsx";
import { useSetAtom } from "jotai";
import { isOpenModalAtom } from "../../store";
import { IconX } from "@tabler/icons-react";
import { Button } from "flowbite-react";

export default function ModalUser() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const setIsOpenModal = useSetAtom(isOpenModalAtom);

  return (
    <div
      className={clsx(
        "fixed z-20 flex min-h-screen w-full",
        "items-center justify-center backdrop-blur-md"
      )}
    >
      <div className="rounded-md bg-white drop-shadow-lg dark:bg-gray-800">
        <div
          className={clsx(
            "flex items-center justify-between border-b-[1.5px] p-4",
            "dark:border-b-gray-400"
          )}
        >
          <p className="text-2xl font-bold">Profile</p>
          <button
            type="button"
            aria-label="close modal"
            className={clsx(
              "rounded-md p-1.5 transition-all",
              "hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
            onClick={() => setIsOpenModal(false)}
          >
            <IconX />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <div className="h-48 w-48 rounded-full border-2 border-cyan-600">
            <Image src={user?.imageUrl as string} alt="user image" className="rounded-full" />
          </div>
          <div className="p-4">
            <p>
              <span className="font-bold">Name: </span>
              {user?.fullName}
            </p>
            <p>
              <span className="font-bold">Email: </span>
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
        <div
          className={clsx(
            "flex items-center justify-end border-t-[1.5px] p-4",
            "dark:border-t-gray-400"
          )}
        >
          <Button onClick={() => signOut()}>Logout</Button>
        </div>
      </div>
    </div>
  );
}
