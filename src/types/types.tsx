import type { Dispatch, SetStateAction } from "react";

export interface LoggedInContextType {
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export interface PageNumberContextType {
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
}

export interface HomeWorld {
  name: string;
  terrain: string;
  climate: string;
  population: string;
}

export interface PeopleCardData {
  name: string;
  height: string;
  mass: string;
  created: string;
  number_of_films: number;
  birth_year: string;
  species: string;
  gender: string;
  homeworld: string;
}

export interface PeopleData {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface PeopleApi {
  count: number;
  next: string;
  previous: string;
  results: PeopleCardData[];
}

export interface FetchPeopleApi {
  count: number;
  next: string;
  previous: string;
  results: PeopleData[];
}
