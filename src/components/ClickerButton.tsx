import { CSSProperties, useContext, useEffect, useRef } from "react";
import { AppStateContext } from "../domain/appContext";
import flame from "../images/flame.png";
import SparkClickAnimation from "./CanvasControl";
import { AppActionsNames, createActionWithPayload } from '../domain/appActions';
import FireMarshal from "./FireMarshal";
import Fire from "../images/fire.svg"

export default function ClickerButton() {
  const { appState, dispatchAppAction, confettiFn } = useContext(AppStateContext);

  const handleClick = () => {
    console.log(`handle click`)
    confettiFn(appState.currCursorX, appState.currCursorY)
    dispatchAppAction(createActionWithPayload(AppActionsNames.FIRE_CLICK));
    // spark = Confetti(appState.currCursorX, appState.currCursorY);
  };

  /** Use app start to grow the image */
  const flameImageStyle: CSSProperties = {
    display: "grid",
    placeContent: "center",
    height: `${Math.min((appState.embersPerSecond / 100) + 5, 95)}vh`, //Give it a 3 percent of monitor height first
    // size
    // TODO use Math.log for fire growth
  };
  // let spark = <div></div>;
  return (
    <div className={"clicker-area"}>
      <div className={"counters"}>
        <div className={"ember-count"}>Embers: {appState.embers.toLocaleString()}</div>
        <div className={"ember-per-second"}>
          Embers per sec: {appState.embersPerSecond.toLocaleString()}
        </div>
      </div>
      <div className="clicker-button" onClick={() => handleClick()}>
        <div className="growing-flame-container">
          <img
            style={flameImageStyle}
            src={flame}
            alt={"Flame level 1"}
            draggable="false"
          />
        </div>
        <FireMarshal />
        <svg path={Fire}></svg>

        {/*<div>{spark}</div>*/}
        {/*<img src={flame} alt={"Flame level 1"} draggable="false" />*/}
      </div>
    </div>
  );
}
