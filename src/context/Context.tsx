import { createContext } from "react";
import type {
  LoggedInContextType,
  PageNumberContextType,
} from "../types/types";

export const LoggedInContext = createContext<LoggedInContextType>({
  loggedIn: false,
  setLoggedIn: () => {},
});

export const PageNumberContext = createContext<PageNumberContextType>({
  pageNum: 1,
  setPageNum: () => {},
});
