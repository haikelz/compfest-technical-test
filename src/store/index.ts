import { atom } from "jotai";
import { BaseMoviesProps, DetailMovieProps, MoviesProps } from "../types";

export const savedMoviesAtom = atom<
  (BaseMoviesProps & { id: string })[] | null
>(null);
export const moviesAtom = atom<MoviesProps | null>(null);
export const isRefetchAtom = atom<boolean>(false);
export const pageAtom = atom<number>(1);
export const detailMovieAtom = atom<DetailMovieProps | null>(null);
