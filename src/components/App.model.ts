import { IGlobalAppState } from "../model/GlobalAppState";

export interface IGlobalAppProps {
  appState: IGlobalAppState;
  setAppState: Function;
}
