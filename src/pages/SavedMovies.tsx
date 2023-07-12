import { IconSearch } from "@tabler/icons-react";
import { Button, Card, TextInput } from "flowbite-react";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTitle } from "../hooks/useTitle";
import { saveMovie } from "../lib/helpers";
import { savedMoviesAtom } from "../store";

const isLoadingAtom = atom<boolean>(true);

export default function SavedMovies() {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
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
    setIsLoading(false);

    if (localStorage.getItem("saved-movies")) {
      setSavedMovies(JSON.parse(localStorage.getItem("saved-movies") || ""));
    }
  }, [setIsLoading, setSavedMovies]);

  useTitle("Saved Movies");

  return (
    <main className="w-full max-w-7xl min-h-screen flex justify-center">
      <section className="w-full flex flex-col items-center">
        <div className="flex w-full justify-center items-center flex-col">
          <h1 className="font-bold text-3xl">Saved Movies</h1>
          <p className="mt-1">Lihat list film yang kamu telah simpan!</p>
          <TextInput
            placeholder="Search here...."
            className="w-96 mt-4"
            icon={IconSearch}
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            name="search"
          />
        </div>
        <div className="mt-5 w-full flex items-center justify-center">
          {isLoading ? (
            <p>Loading....</p>
          ) : filteredSavedMovies?.length ? (
            <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 grid-rows-1 gap-6">
              {filteredSavedMovies?.map((item) => (
                <Card key={item.id}>
                  <img
                    className="w-full h-96"
                    src={item.Poster}
                    alt={item.Title}
                    loading="lazy"
                    decoding="async"
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
                    color="failure"
                    onClick={() => handleDeleteSavedMovie(item.id, item.Title)}
                  >
                    Delete
                  </Button>
                  <Link to={`/detail-movie/${item.imdbID}`} className="w-full">
                    <Button className="font-bold w-full" color="gray">
                      More Detail
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center font-bold">Tidak ada data!</p>
          )}
        </div>
      </section>
      <ToastContainer />
    </main>
  );
}
