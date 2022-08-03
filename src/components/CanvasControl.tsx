import { CSSProperties, useContext } from "react";
import { AppStateContext } from "../domain/appContext";

import flame from "../images/flame.png";

export default function SparkClickAnimation() {
  const { appState } = useContext(AppStateContext);

  const containerSize = 30 * (appState.clickPower + 1); // Add one since it starts at zero
  const cssInJs: CSSProperties = {
    top: appState.currCursorY - 70, //minus 15 for center of cursor
    left: appState.currCursorX - 400 - 30, //400 for upgrade container // 15
    height: `${containerSize}px`,
    width: `${containerSize}px`,
    display: `${true ? "block" : "none"}`,
    position: "absolute",
    opacity: `${(appState.embersPerSecond + 1) * 2}%`,
  };
  return (
    <div style={cssInJs} className={"spark"}>
      <img src={flame} alt={"spark"} draggable="false" />
    </div>
  );
}
