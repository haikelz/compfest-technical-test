import { IconSearch } from "@tabler/icons-react";
import { Button, Card, TextInput } from "flowbite-react";
import { atom, useAtom } from "jotai";
import { nanoid } from "nanoid";
import { FormEvent, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "../components/ui/Image";
import { env } from "../env";
import { saveMovie } from "../lib/helpers";
import { isRefetchAtom, moviesAtom, pageAtom, savedMoviesAtom } from "../store";

const isLoadingAtom = atom<boolean>(true);

export default function Home() {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
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
    toast(`Film ${title} berhasil dihapus!`, { autoClose: 2500 });
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
        } catch (err) {
          console.error(err);
        }
      }

      getData();
    }

    setIsLoading(false);
    setIsRefetch(false);

    if (localStorage.getItem("saved-movies")) {
      setSavedMovies(JSON.parse(localStorage.getItem("saved-movies") || ""));
    }
  }, [setIsLoading, setMovies, isRefetch, setSavedMovies]);

  return (
    <main className="w-full max-w-7xl min-h-screen flex justify-center">
      <section className="w-full flex flex-col items-center">
        <div className="flex w-full justify-center items-center flex-col text-center">
          <h1 className="font-bold text-3xl">Cara Baru Cari Film</h1>
          <p className="mt-1">Ayo cari film kamu sekarang!</p>
          <form
            onSubmit={handleSubmit}
            className="w-full flex justify-center items-center mt-4"
          >
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
        <div className="mt-5 w-full flex flex-col justify-center items-center">
          {isLoading ? (
            <p>Loading....</p>
          ) : movies !== null ? (
            <>
              {movies.Response !== "False" ? (
                <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 grid-rows-1 gap-6">
                  {movies.Search.map((item) => (
                    <Card key={item.imdbID}>
                      <Image
                        className="w-full h-96"
                        src={item.Poster}
                        alt={item.Title}
                      />
                      <div>
                        <p className="font-bold tracking-wide text-xl">
                          {item.Title}
                        </p>
                        <p className="capitalize font-medium">{item.Type}</p>
                        <p className="text-sm mt-2">{item.Year}</p>
                      </div>
                      <Button
                        className="font-bold"
                        color="purple"
                        onClick={() => handleSave(item.imdbID, item.Title)}
                      >
                        Save Movie
                      </Button>
                      <Link
                        to={`/detail-movie/${item.imdbID}`}
                        className="w-full"
                      >
                        <Button className="font-bold w-full" color="gray">
                          More Detail
                        </Button>
                      </Link>
                    </Card>
                  ))}
                </div>
              ) : (
                <div>
                  <Image
                    src="/img/no-data.svg"
                    alt="no data"
                    className="w-80 h-80"
                  />
                  <p className="text-center mt-5 text-lg font-bold">
                    Film tidak ditemukan!
                  </p>
                </div>
              )}
              <div className="flex mt-7 space-x-3">
                {new Array(6)
                  .fill(null)
                  .map((_, index) => index + 1)
                  .map((item) => (
                    <Button
                      key={`Button page ${item}`}
                      onClick={() => handlePage(item)}
                    >
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
                className="sm:w-80 w-60 h-60 sm:h-80"
              />
              <p className="text-center mt-5 text-lg font-bold">
                Belum ada Film yang kamu cari!
              </p>
            </div>
          )}
        </div>
      </section>
      <ToastContainer />
    </main>
  );
}
