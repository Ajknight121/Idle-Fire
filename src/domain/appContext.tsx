import React, { createContext, useReducer } from "react";
import {GlobalAppState, IGlobalAppState} from "../model/GlobalAppState";
import { IAppAction } from "./appActions";
import { AppReducer } from "./appReducer";

export const gameDataKey = 'gameData';
//TO DO implement service for all localStorage actions (separate file, could be by api/web request).
const storedState: IGlobalAppState = JSON.parse(localStorage.getItem(gameDataKey) ?? '{}');

const initialAppState = (Object.keys(storedState).length) ? storedState : new GlobalAppState();

export type GlobalContext = {
  appState: GlobalAppState;
  dispatchAppAction: React.Dispatch<IAppAction>;
};

export const AppStateContext = createContext<GlobalContext>({
  appState: initialAppState,
  dispatchAppAction: () => {},
});

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [appState, dispatch] = useReducer(AppReducer, initialAppState);
  return (
    <AppStateContext.Provider value={{ appState, dispatchAppAction: dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}
