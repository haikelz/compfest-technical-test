import { atom } from "jotai";
import { BaseMoviesProps, DetailMovieProps, MoviesProps } from "../types";

export const isOpenModalEditAtom = atom<boolean>(false);
export const isOpenModalAtom = atom<boolean>(false);

// movies
export const moviesAtom = atom<MoviesProps | null>(null);
export const isRefetchAtom = atom<boolean>(false);
export const pageAtom = atom<number>(1);

// saved movies
export const savedMoviesAtom = atom<(BaseMoviesProps & { id: string })[] | null>(null);

// detail movie
export const detailMovieAtom = atom<DetailMovieProps | null>(null);

export const scrollAtom = atom<number>(0);
