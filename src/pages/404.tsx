import Image from "../components/ui/Image";

export default function NotFoundPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center text-center">
        <Image className="h-96 w-96" src="/img/not-found.svg" alt="Not Found Page" />
        <h1 className="text-4xl font-bold">Not Found 😐</h1>
        <p className="mt-2 font-medium tracking-wide">
          Looks like the page that you want to visit is not found!
        </p>
      </div>
    </div>
  );
}
