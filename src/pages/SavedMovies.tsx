import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { savedMoviesAtom } from "../store";

const isLoadingAtom = atom<boolean>(true);

export default function SavedMovies() {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [savedMovies, setSavedMovies] = useAtom(savedMoviesAtom);

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  return (
    <div>
      {isLoading ? (
        <p>Loading....</p>
      ) : savedMovies !== null ? (
        savedMovies?.map((item) => (
          <div key={item.Title}>
            <p>{item.Title}</p>
          </div>
        ))
      ) : (
        <p>Belum ada data!</p>
      )}
    </div>
  );
}
