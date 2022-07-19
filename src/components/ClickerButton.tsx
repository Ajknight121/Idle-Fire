import React from "react";
import { GlobalAppState } from "../model/GlobalAppState";
import { IGlobalAppProps } from "./App.model";
import flame from "../images/flame.png";

export default function ClickerButton(props: IGlobalAppProps) {
  const { appState, setAppState } = props;
  const handleClick = () => {
    const newState = GlobalAppState.addsEmberToTotal(appState);
    setAppState(newState);
  };
  return (
    <div className={"clicker-area"}>
      <div className={"counters"}>
          <div className={"ember-count"}>Embers: {appState.embers}</div>
          <div className={"ember-per-second"}>Total Clicks: {appState.totalClicks}</div>
      </div>
      <div className="clicker-button" onClick={handleClick}>
          <img src={flame} alt={"Flame level 1"}/>
      </div>
    </div>
  );
}
