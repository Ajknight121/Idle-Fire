import React, { createContext, useEffect, useReducer, useRef } from "react";
import { GlobalAppState, IGlobalAppState } from "../model/GlobalAppState";
import { IAppAction } from "./appActions";
import { AppReducer } from "./appReducer";
import SparkClickAnimation from "../components/CanvasControl";

export const gameDataKey = 'gameData';
//TO DO implement service for all localStorage actions (separate file, could be by api/web request).
const storedState: IGlobalAppState = JSON.parse(localStorage.getItem(gameDataKey) ?? '{}');

const initialAppState = (Object.keys(storedState).length) ? storedState : new GlobalAppState();
const sessionStartTimes = [...initialAppState.sessionStartTimes, new Date().valueOf()]
export type GlobalContext = {
  appState: GlobalAppState;
  dispatchAppAction: React.Dispatch<IAppAction>;
  confettiFn: any
};

export const AppStateContext = createContext<GlobalContext>({
  appState: {...initialAppState, sessionStartTimes},
  dispatchAppAction: () => { },
  confettiFn: () => { }
});

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [appState, dispatch] = useReducer(AppReducer, initialAppState);
  return (
    <AppStateContext.Provider value={{ appState, dispatchAppAction: dispatch, confettiFn: SparkClickAnimation() }}>
      {children}
    </AppStateContext.Provider>
  );
}
