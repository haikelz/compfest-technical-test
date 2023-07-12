import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { env } from "../env";
import { DetailMovieProps } from "../types";

const isLoadingAtom = atom<boolean>(true);
const detailMovieAtom = atom<DetailMovieProps | null>(null);

const { VITE_MOVIES_API } = env;

export default function DetailMovie() {
  const { imdbID } = useParams();

  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [detailMovie, setDetailMovie] = useAtom(detailMovieAtom);

  useEffect(() => {
    async function getData() {
      const response = await fetch(`${VITE_MOVIES_API}&i=${imdbID}`);
      const data = await response.json();

      setDetailMovie(data);
    }

    getData();
    setIsLoading(false);
  }, [setIsLoading, setDetailMovie]);

  return (
    <div className="w-full border-2 min-h-screen flex">
      <div>
        <img src={detailMovie?.Poster} alt={detailMovie?.Title} />
        <div>
          <p>{detailMovie?.Title}</p>
          <p>{detailMovie?.Country}</p>
          <p>{detailMovie?.Genre}</p>
          <p>{detailMovie?.imdbRating}</p>
          <p>{detailMovie?.totalSeasons}</p>
          <p>{detailMovie?.Actors}</p>
          <p>{detailMovie?.Released}</p>
          <p>{detailMovie?.Plot}</p>
        </div>
      </div>
    </div>
  );
}
