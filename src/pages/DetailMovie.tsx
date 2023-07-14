import { useAtom } from "jotai";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
      try {
        const response = await fetch(`${VITE_MOVIES_API}&i=${imdbID}`);
        const data = await response.json();

        setDetailMovie(data);
      } catch (err: any) {
        toast(err.message, { autoClose: 2500 });
        console.error(err);
      }
    }

    getData();
  }, [setDetailMovie]);

  useTitle(detailMovie?.Title as string);

  return (
    <div className="flex min-h-screen w-full">
      <div>
        <Image
          src={detailMovie?.Poster as string}
          className="h-96 w-96 rounded-md"
          alt={detailMovie?.Title as string}
        />
        <div className="mt-2">
          <p className="text-3xl font-bold tracking-wide">{detailMovie?.Title}</p>
          <div className="mt-3 space-y-1">
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
              <span className="font-semibold">Plot: </span>
              {detailMovie?.Plot}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
