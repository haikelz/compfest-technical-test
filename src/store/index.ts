import { atom } from "jotai";
import { MoviesProps } from "../types";

export const savedMoviesAtom = atom<MoviesProps[] | []>([]);
export const moviesAtom = atom<MoviesProps[] | null>(null);
export const isLoadingAtom = atom<boolean>(true);
