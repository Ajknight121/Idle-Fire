import { useContext } from "react";
import { AppStateContext } from "../domain/appContext";

export default function Statistics() {
  const { appState } = useContext(AppStateContext);
  return (
    <div className={"statistics"}>
      <div className={"statistics-label"}>Stats</div>
      Time played: {appState.time} seconds <br />
      Total embers produced: {appState.totalEmbers}
      <br />
      Fire clicks: {appState.totalClicks}
      <br />
      Embers from clicking: unknown
      <br />
    </div>
  );
}
