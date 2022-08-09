import React, { createContext, useReducer } from "react";
import { GlobalAppState } from "../model/GlobalAppState";
import { IAppAction } from "./appActions";
import { AppReducer } from "./appReducer";

const initialAppState = new GlobalAppState();

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
