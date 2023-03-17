import React, { createContext, useEffect, useReducer, useRef } from "react";
import { GlobalAppState, IGlobalAppState } from "../model/GlobalAppState";
import { IAppAction } from "./appActions";
import { AppReducer } from "./appReducer";
import SparkClickAnimation from "../components/CanvasControl";

export const gameDataKey = 'gameData';
//TO DO implement service for all localStorage actions (separate file, could be by api/web request).
const storedState: IGlobalAppState = JSON.parse(localStorage.getItem(gameDataKey) ?? '{}');

const initialAppState = (Object.keys(storedState).length) ? storedState : new GlobalAppState();

export type GlobalContext = {
  appState: GlobalAppState;
  dispatchAppAction: React.Dispatch<IAppAction>;
  confettiFn: any
};

export const AppStateContext = createContext<GlobalContext>({
  appState: initialAppState,
  dispatchAppAction: () => { },
  confettiFn: () => { }
});

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  // const confettiFunctionSetup = useRef(false);
  // // let confettiFn = () => { }
  // // //Here to work around bug in react where app renders twice in strict mode
  // // useEffect(() => {
  // //   if (confettiFunctionSetup.current) {
  // //     return;
  // //   }
  // //   confettiFn = SparkClickAnimation() as any
  // //   // But only once, reason: see
  // //   confettiFunctionSetup.current = true;
  // // }, []);
  const [appState, dispatch] = useReducer(AppReducer, initialAppState);
  return (
    <AppStateContext.Provider value={{ appState, dispatchAppAction: dispatch, confettiFn: SparkClickAnimation() }}>
      {children}
    </AppStateContext.Provider>
  );
}
