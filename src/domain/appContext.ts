import { createContext } from "react";
import { GlobalAppState, IGlobalAppState } from "../model/GlobalAppState";

export interface AppContext {
  appState: IGlobalAppState;
  setAppState: Function;
}

export const AppContext = createContext({
  appState: new GlobalAppState(),
  setAppState: () => {},
} as AppContext);
