import { IconSearch } from "@tabler/icons-react";
import clsx from "clsx";
import { Button, Card, TextInput } from "flowbite-react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import reactStringReplace from "react-string-replace";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "../components/ui/Image";
import { useTitle } from "../hooks";
import { saveMovie } from "../lib/helpers";
import { savedMoviesAtom } from "../store";

export default function SavedMovies() {
  const [savedMovies, setSavedMovies] = useAtom(savedMoviesAtom);
  const [search, setSearch] = useState<string>("");

  function handleDeleteSavedMovie(id: string, title: string) {
    const data = [...(savedMovies || [])];
    const filteredData = data.filter((item) => item.id !== id);

    setSavedMovies(filteredData);
    saveMovie(filteredData);
    toast(`Film ${title} berhasil dihapus!`, { autoClose: 2500 });
  }

  const filteredSavedMovies = savedMovies?.filter((item) => {
    if (search === "") {
      return item;
    } else if (item.Title.toLowerCase().includes(search.toLowerCase())) {
      return item;
    }
  });

  useEffect(() => {
    if (secureLocalStorage.getItem("saved-movies")) {
      setSavedMovies(JSON.parse(secureLocalStorage.getItem("saved-movies") as string));
    }
  }, [setSavedMovies]);

  useTitle("Saved Movies");

  return (
    <main className="flex min-h-screen w-full max-w-7xl justify-center">
      <section className="flex w-full flex-col items-center">
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Saved Movies</h1>
          <p className="mt-1">Lihat list film yang telah kamu simpan!</p>
          <TextInput
            placeholder="Cari disini...."
            className="mt-4 w-96"
            icon={IconSearch}
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            name="search"
          />
        </div>
        <div className="mt-5 flex w-full items-center justify-center">
          {filteredSavedMovies?.length ? (
            <div
              className={clsx(
                "grid w-full grid-cols-1 grid-rows-1 gap-6",
                "sm:grid-cols-2",
                "lg:grid-cols-3"
              )}
            >
              {filteredSavedMovies?.map((item) => (
                <Card key={item.id}>
                  <Image className="h-96 w-full" src={item.Poster} alt={item.Title} />
                  <div>
                    <p className="text-xl font-bold tracking-wide">
                      {reactStringReplace(item.Title, search, (match: string, index: number) => (
                        <span key={index + 1} className="bg-yellow-300">
                          {match}
                        </span>
                      ))}
                    </p>
                    <p className="font-medium capitalize">{item.Type}</p>
                    <p className="mt-2 text-sm">{item.Year}</p>
                  </div>
                  <Button
                    className="font-bold"
                    color="failure"
                    onClick={() => handleDeleteSavedMovie(item.id, item.Title)}
                  >
                    Delete
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
              <p className="mt-5 text-center text-lg font-bold">Tidak ada Film!</p>
            </div>
          )}
        </div>
      </section>
      <ToastContainer />
    </main>
  );
}
