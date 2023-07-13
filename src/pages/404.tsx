import Image from "../components/ui/Image";

export default function NotFoundPage() {
  return (
    <div className="w-full">
      <div className="flex justify-center items-center flex-col text-center">
        <Image
          className="w-96 h-96"
          src="/img/not-found.svg"
          alt="Not Found Page"
        />
        <h1 className="font-bold text-4xl">404 Not Found 😐</h1>
        <p className="mt-2 font-medium tracking-wide">
          Looks like the page that you want to visit is not found!
        </p>
      </div>
    </div>
  );
}
