import React from "react";
import { GlobalAppState } from "../model/GlobalAppState";
import { IGlobalAppProps } from "./App.model";

export default function ClickerButton(props: IGlobalAppProps) {
  const { appState, setAppState } = props;
  const handleClick = () => {
    const newState = GlobalAppState.addsEmberToTotal(appState);
    setAppState(newState);
  };
  return (
    <React.Fragment>
      <div>Total Clicks: {appState.totalClicks}</div>
      <div>Embers: {appState.embers}</div>
      <div className="clicker-button" onClick={handleClick}>
        Clicking Area
      </div>
    </React.Fragment>
  );
}
