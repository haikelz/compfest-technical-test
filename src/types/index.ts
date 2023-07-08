import { ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode;
};

export type MoviesProps = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};
