import { CSSProperties, useContext } from "react";
import { AppStateContext } from "../domain/appContext";

import flame from "../images/flame.png";
import Confetti from "./svgFire";

export default function SparkClickAnimation() {
  // const { appState } = useContext(AppStateContext);

  const containerSize = 60;
  const cssInJs: CSSProperties = {
    // top: appState.currCursorY - 70, //minus 15 for center of cursor
    // left: appState.currCursorX - 400 - 15, //400 for upgrade container // 15
    top: 300,
    left: 300,
    height: `${containerSize}px`,
    width: `${containerSize}px`,
    display: `${true ? "block" : "none"}`,
    position: "absolute",
    // opacity: `${(appState.embersPerSecond + 1) * 2}%`,
  };

  const svgElement = Confetti(300,300);

  return (
      <div style={cssInJs}>
        {svgElement}
      </div>
    // <div style={cssInJs} className={"spark"}>
    //   {/*<img src={flame} alt={"spark"} draggable="false" />*/}
    // </div>
  );
}
