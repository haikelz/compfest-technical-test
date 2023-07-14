import { IconSearch } from "@tabler/icons-react";
import { Button, Card, TextInput } from "flowbite-react";
import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import { FormEvent, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "../components/ui/Image";
import { env } from "../env";
import { saveMovie } from "../lib/helpers";
import { isRefetchAtom, moviesAtom, pageAtom, savedMoviesAtom } from "../store";
import clsx from "clsx";
import secureLocalStorage from "react-secure-storage";

export default function Home() {
  const [movies, setMovies] = useAtom(moviesAtom);
  const [savedMovies, setSavedMovies] = useAtom(savedMoviesAtom);
  const [isRefetch, setIsRefetch] = useAtom(isRefetchAtom);
  const [page, setPage] = useAtom(pageAtom);

  const { VITE_MOVIES_API } = env;

  const searchRef = useRef<HTMLInputElement>(null);

  function handleSave(id: string, title: string) {
    const savedMoviesData = [...(savedMovies || [])];
    const moviesData = [...(movies?.Search || [])];
    const foundData = moviesData.find((item) => item.imdbID === id);

    savedMoviesData.push({
      id: nanoid(),
      imdbID: foundData!.imdbID,
      Title: foundData!.Title,
      Poster: foundData!.Poster,
      Type: foundData!.Type,
      Year: foundData!.Year,
    });

    setSavedMovies(savedMoviesData);
    saveMovie(savedMoviesData);
    toast(`Film ${title} berhasil ditambahkan!`, { autoClose: 2500 });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsRefetch(true);
  }

  function handlePage(num: number) {
    setIsRefetch(true);
    setPage(num);
  }

  useEffect(() => {
    if (isRefetch) {
      async function getData(): Promise<void> {
        try {
          const response = await fetch(
            `${VITE_MOVIES_API}&s=${searchRef.current?.value}&page=${page}`
          );
          const data = await response.json();

          setMovies(data);
        } catch (err: any) {
          toast(err.message, { autoClose: 2500 });
          console.error(err);
        }
      }

      getData();
    }

    setIsRefetch(false);

    if (secureLocalStorage.getItem("saved-movies")) {
      setSavedMovies(JSON.parse(secureLocalStorage.getItem("saved-movies") as string));
    }
  }, [setMovies, isRefetch, setSavedMovies, searchRef]);

  return (
    <main className="flex min-h-screen w-full max-w-7xl justify-center">
      <section className="flex w-full flex-col items-center">
        <div className="flex w-full flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold">Cara Baru Cari Film</h1>
          <p className="mt-1">Ayo cari film kamu sekarang!</p>
          <form onSubmit={handleSubmit} className="mt-4 flex w-full items-center justify-center">
            <TextInput
              icon={IconSearch}
              placeholder="Cari disini...."
              type="search"
              ref={searchRef}
              className="w-96"
              name="search"
            />
          </form>
        </div>
        <div className="mt-5 flex w-full flex-col items-center justify-center">
          {movies !== null ? (
            <>
              {movies.Response !== "False" ? (
                <div
                  className={clsx(
                    "grid w-full grid-cols-1 grid-rows-1 gap-6",
                    "sm:grid-cols-2",
                    "lg:grid-cols-3"
                  )}
                >
                  {movies.Search.map((item) => (
                    <Card key={item.imdbID}>
                      <Image className="h-96 w-full" src={item.Poster} alt={item.Title} />
                      <div>
                        <p className="text-xl font-bold tracking-wide">{item.Title}</p>
                        <p className="font-medium capitalize">{item.Type}</p>
                        <p className="mt-2 text-sm">{item.Year}</p>
                      </div>
                      <Button
                        className="font-bold"
                        color="purple"
                        onClick={() => handleSave(item.imdbID, item.Title)}
                      >
                        Save Movie
                      </Button>
                      <Link to={`/detail-movie/${item.imdbID}`} className="w-full">
                        <Button className="w-full font-bold" color="gray">
                          More Detail
                        </Button>
                      </Link>
                    </Card>
                  ))}
                </div>
              ) : (
                <div>
                  <Image src="/img/no-data.svg" alt="no data" className="h-80 w-80" />
                  <p className="mt-5 text-center text-lg font-bold">Film tidak ditemukan!</p>
                </div>
              )}
              <div className="mt-7 flex space-x-3">
                {new Array(6)
                  .fill(null)
                  .map((_, index) => index + 1)
                  .map((item) => (
                    <Button key={`Button page ${item}`} onClick={() => handlePage(item)}>
                      {item}
                    </Button>
                  ))}
              </div>
            </>
          ) : (
            <div>
              <Image
                src="/img/no-data.svg"
                alt="no data"
                className={clsx("h-60 w-60", "sm:h-80 sm:w-80")}
              />
              <p className="mt-5 text-center text-lg font-bold">Belum ada Film yang kamu cari!</p>
            </div>
          )}
        </div>
      </section>
      <ToastContainer />
    </main>
  );
}
