import { IconSearch } from "@tabler/icons-react";
import { Button, Card, TextInput } from "flowbite-react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import reactStringReplace from "react-string-replace";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "../components/ui/Image";
import { useTitle } from "../hooks/useTitle";
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
    if (localStorage.getItem("saved-movies")) {
      setSavedMovies(JSON.parse(localStorage.getItem("saved-movies") || ""));
    }
  }, [setSavedMovies]);

  useTitle("Saved Movies");

  return (
    <main className="w-full max-w-7xl min-h-screen flex justify-center">
      <section className="w-full flex flex-col items-center">
        <div className="flex w-full justify-center items-center flex-col">
          <h1 className="font-bold text-3xl">Saved Movies</h1>
          <p className="mt-1">Lihat list film yang telah kamu simpan!</p>
          <TextInput
            placeholder="Cari disini...."
            className="w-96 mt-4"
            icon={IconSearch}
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            name="search"
          />
        </div>
        <div className="mt-5 w-full flex items-center justify-center">
          {filteredSavedMovies?.length ? (
            <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 grid-rows-1 gap-6">
              {filteredSavedMovies?.map((item) => (
                <Card key={item.id}>
                  <Image
                    className="w-full h-96"
                    src={item.Poster}
                    alt={item.Title}
                  />
                  <div>
                    <p className="font-bold tracking-wide text-xl">
                      {reactStringReplace(
                        item.Title,
                        search,
                        (match: string, index: number) => (
                          <span key={index + 1} className="bg-yellow-300">
                            {match}
                          </span>
                        )
                      )}
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
