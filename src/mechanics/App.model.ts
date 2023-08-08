import { IGlobalAppState } from "./GlobalAppState";

export interface IGlobalAppProps {
  appState: IGlobalAppState;
  setAppState: Function;
}
