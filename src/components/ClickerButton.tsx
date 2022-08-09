import { CSSProperties, useContext } from "react";
import { AppStateContext } from "../domain/appContext";
import flame from "../images/flame.png";
import SparkClickAnimation from "./CanvasControl";
import { AppActionsNames, createActionWithPayload } from '../domain/appActions';

export default function ClickerButton() {
  const { appState, dispatchAppAction } = useContext(AppStateContext);
  const handleClick = () => {
    dispatchAppAction(createActionWithPayload(AppActionsNames.FIRE_CLICK));
  };

  /** Use app start to grow the image */
  const flameImageStyle: CSSProperties = {
    display: "grid",
    placeContent: "center",
    height: `${Math.min((appState.embersPerSecond/ 100) + 5, 100)}vh`, //Give it a 3 percent of monitor height first
    // size
  };

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
        <SparkClickAnimation />
        {/*<img src={flame} alt={"Flame level 1"} draggable="false" />*/}
      </div>
    </div>
  );
}
