import { useAtom } from "jotai";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Image from "../components/ui/Image";
import { env } from "../env";
import { useTitle } from "../hooks";
import { detailMovieAtom } from "../store";

const { VITE_MOVIES_API } = env;

export default function DetailMovie() {
  const { imdbID } = useParams();

  const [detailMovie, setDetailMovie] = useAtom(detailMovieAtom);

  useEffect(() => {
    async function getData() {
      const response = await fetch(`${VITE_MOVIES_API}&i=${imdbID}`);
      const data = await response.json();

      setDetailMovie(data);
    }

    getData();
  }, [setDetailMovie]);

  useTitle(detailMovie?.Title as string);

  return (
    <div className="w-full min-h-screen flex">
      {/** TODO: styling */}
      <div>
        <Image
          src={detailMovie?.Poster as string}
          className="w-96 h-96 rounded-md"
          alt={detailMovie?.Title as string}
        />
        <div className="mt-2">
          <p className="font-bold tracking-wide text-3xl">
            {detailMovie?.Title}
          </p>
          <div className="space-y-1 mt-3">
            <p>
              <span className="font-semibold">Country: </span>
              {detailMovie?.Country}
            </p>
            <p>
              <span className="font-semibold">Genre: </span>
              {detailMovie?.Genre}
            </p>
            <p>
              <span className="font-semibold">Rating: </span>
              {detailMovie?.imdbRating}
            </p>
            <p>
              <span className="font-semibold">Total Seasons: </span>
              {detailMovie?.totalSeasons}
            </p>
            <p>
              <span className="font-semibold">Actors: </span>
              {detailMovie?.Actors}
            </p>
            <p>
              <span className="font-semibold">Released Date: </span>
              {detailMovie?.Released}
            </p>
            <p className="md:w-1/2">
              {detailMovie?.Plot}
              <span className="font-semibold">Plot: </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
