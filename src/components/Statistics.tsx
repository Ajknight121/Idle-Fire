import { useContext } from "react";
import { AppStateContext } from "../domain/appContext";

export default function Statistics() {
  const { appState } = useContext(AppStateContext);
  return (
    <div className={"statistics"}>
      <div className={"statistics-label"}>Stats</div>
      {/*Time played: {appState.time.toLocaleString()} seconds <br />  implement time*/}
      Total embers produced: {appState.totalEmbers.toLocaleString()}
      <br />
      Fire clicks: {appState.totalClicks.toLocaleString()}
      <br />
      Embers from clicking: {appState.embersFromFire.toLocaleString()}
      <br />
    </div>
  );
}
