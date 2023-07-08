import { Button, Card } from "flowbite-react";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { isLoadingAtom, moviesAtom, savedMoviesAtom } from "../store";
import { MoviesProps } from "../types";

export default function Home() {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [movies, setMovies] = useAtom(moviesAtom);
  const [savedMovies, setSavedMovies] = useAtom(savedMoviesAtom);

  function saveMovie<T>(newData: T) {
    localStorage.setItem("saved-movies", JSON.stringify(newData));
  }

  function handleSave(id: string) {
    const savedMoviesData = [...savedMovies] as MoviesProps[];
    const moviesData = [...(movies || [])] as MoviesProps[];
    const foundData = moviesData.find((item) => item.imdbID === id);

    savedMoviesData.push({
      imdbID: foundData!.imdbID,
      Title: foundData!.Title,
      Poster: foundData!.Poster,
      Type: foundData!.Type,
      Year: foundData!.Year,
    });

    setSavedMovies(savedMoviesData);
    saveMovie(savedMoviesData);
  }

  function handleDeleteSavedMovie(id: string) {
    const data = [...savedMovies];
    const filteredData = data.filter((item) => item.imdbID !== id);

    setSavedMovies(filteredData);
    saveMovie(filteredData);
  }

  useEffect(() => {
    async function getData(): Promise<void> {
      const response = await fetch(
        "http://www.omdbapi.com/?apikey=9e9f47e9&s=jaws"
      );
      const data = await response.json();

      setMovies(data.Search);
    }

    getData();
    setIsLoading(false);

    if (localStorage.getItem("saved-movies")) {
      setSavedMovies(JSON.parse(localStorage.getItem("saved-movies") || ""));
    }
  }, [setIsLoading, setMovies, setSavedMovies]);

  return (
    <main className="w-full max-w-7xl min-h-screen flex justify-center">
      <section className="w-full">
        <h1>Cari Film yang kamu ingin tonton!</h1>
        <div>
          <p>Daftar film saat ini</p>
          <div className="grid grid-cols-3 grid-rows-1 gap-6">
            {isLoading ? (
              <p>Loading....</p>
            ) : movies !== null ? (
              movies?.map((item) => (
                <Card key={item.imdbID}>
                  <img
                    className="w-full h-96"
                    src={item.Poster}
                    alt={item.Title}
                    loading="lazy"
                    decoding="async"
                  />
                  <p>{item.Title}</p>
                  <Button onClick={() => handleSave(item.imdbID)}>Save</Button>
                </Card>
              ))
            ) : (
              <p>Belum ada data!</p>
            )}
          </div>
          <div>
            <p>Film yang kamu simpan</p>
            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              {isLoading ? (
                <p>Loading....</p>
              ) : savedMovies.length ? (
                savedMovies?.map((item) => (
                  <Card key={item.imdbID}>
                    <img
                      className="w-full h-96"
                      src={item.Poster}
                      alt={item.Title}
                      loading="lazy"
                      decoding="async"
                    />
                    <p>{item.Title}</p>
                    <Button onClick={() => handleDeleteSavedMovie(item.imdbID)}>
                      Delete
                    </Button>
                  </Card>
                ))
              ) : (
                <p>Belum ada data!</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
