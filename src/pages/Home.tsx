import { Card } from "flowbite-react";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

type FilmsProps = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

const filmsAtom = atom<FilmsProps[] | null>(null);
const isLoadingAtom = atom<boolean>(true);
const savedFilmsAtom = atom<FilmsProps[] | null>(null);

export default function Home() {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [films, setFilms] = useAtom(filmsAtom);
  const [savedFilms, setSavedFilms] = useAtom(savedFilmsAtom);

  useEffect(() => {
    async function getData(): Promise<void> {
      const response = await fetch(
        "http://www.omdbapi.com/?apikey=9e9f47e9&s=jaws"
      );
      const data = await response.json();

      setFilms(data.Search);
    }

    getData();
    setIsLoading(false);

    if (localStorage.getItem("films")) {
      setSavedFilms(JSON.parse(localStorage.getItem("films") as string));
    }
  }, [setIsLoading, setFilms, setSavedFilms]);

  return (
    <main className="w-full max-w-7xl min-h-screen flex justify-center">
      <section className="w-full">
        <h1>Cari Film yang kamu ingin tonton!</h1>
        <div>
          <p>Daftar film saat ini</p>
          <div className="grid grid-cols-3 grid-rows-1">
            {isLoading ? (
              <p>Loading....</p>
            ) : films !== null ? (
              films?.map((item) => (
                <Card key={item.Title}>
                  <p>{item.Title}</p>
                  <button>Save</button>
                </Card>
              ))
            ) : (
              <p>Belum ada data!</p>
            )}
          </div>
          <div>
            <p>Film yang kamu simpan</p>
            {isLoading ? (
              <p>Loading....</p>
            ) : savedFilms !== null ? (
              savedFilms?.map((item) => (
                <Card key={item.Title}>
                  <p>{item.Title}</p>
                </Card>
              ))
            ) : (
              <p>Belum ada data!</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
