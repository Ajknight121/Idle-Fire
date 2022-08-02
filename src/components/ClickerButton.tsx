import React, {CSSProperties, useState} from "react";
import { GlobalAppState } from "../model/GlobalAppState";
import { IGlobalAppProps } from "./App.model";
import flame from "../images/flame.png";
import SparkClickAnimation from "./CanvasControl";

export default function ClickerButton(props: IGlobalAppProps) {
  const { appState, setAppState } = props;
  const handleClick = () => {
    const newState = GlobalAppState.addsEmberToTotal(appState);
    setAppState(newState);
  };

    /** Use app start to grow the image */
    const flameImageStyle: CSSProperties = {
        display: "grid",
        placeContent: "center",
        height: `${Math.min((appState.embersPerSecond + 3), 100)}vh`, //Give it a 3 percent of monitor height first size
    };

  return (
    <div className={"clicker-area"}>
      <div className={"counters"}>
        <div className={"ember-count"}>Embers: {appState.embers}</div>
        <div className={"ember-per-second"}>
          Embers per sec: {appState.embersPerSecond}
        </div>
      </div>
      <div className="clicker-button" onClick={handleClick}>
          <div className="growing-flame-container">
              <img
                  style={flameImageStyle}
                  src={flame}
                  alt={"Flame level 1"}
                  draggable="false"
              />
          </div>
          <SparkClickAnimation appState={appState} setAppState={setAppState} />
        {/*<img src={flame} alt={"Flame level 1"} draggable="false" />*/}
      </div>
    </div>
  );
}
