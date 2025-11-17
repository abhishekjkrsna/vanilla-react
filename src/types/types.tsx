import type { Dispatch, SetStateAction } from "react";

export interface LoggedInContextType {
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export interface PageNumberContextType {
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
}

export interface PeopleCardData {
  name: string;
  birth_year: string;
}
