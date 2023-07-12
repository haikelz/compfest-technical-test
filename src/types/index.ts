import { ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode;
};

export type BaseMoviesProps = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type MoviesProps = {
  Search: BaseMoviesProps[];
  Response: "True" | "False";
  Error: string;
};

export type DetailMovieProps = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  totalSeasons: string;
  Response: string;
};
