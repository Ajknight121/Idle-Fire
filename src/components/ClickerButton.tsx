import { CSSProperties, useCallback } from "react";
import { TIME_TO_DISPLAY_CLICK_ANIMATION } from "../domain/contants";
import flame from "../images/flame.png";
import { GlobalAppState } from "../model/GlobalAppState";
import { IGlobalAppProps } from "./App.model";

export default function ClickerButton(props: IGlobalAppProps) {
  const { appState, setAppState } = props;

  const handleClick = () => {
    //Setting state back to display of false is problematic right now
    // if (appState.displayAnimationForClick === false) {
    //   setTimeout(() => {
    //     const newHiddenAnimationState =
    //       GlobalAppState.resetClickAnimationToHidden(appState);
    //     setAppState(newHiddenAnimationState);
    //   }, TIME_TO_DISPLAY_CLICK_ANIMATION);
    // }
    const newState = GlobalAppState.addsEmberToTotal(appState);
    //Set a timeout to hide the animation icon if showing for the first time
    setAppState(newState);
  };

  /** Use app start to grow the image */
  const flameImageStyle: CSSProperties = {
    display: "grid",
    placeContent: "center",
    height: `${appState.embersPerSecond + 3}vh`, //Give it a 3 percent of monitor height first size
  };

  return (
    <div className="clicker-area" onClick={handleClick}>
      <div className="counters">
        <div className="ember-count">Embers: {appState.embers}</div>
        <div className="ember-per-second">
          Embers per sec: {appState.embersPerSecond}
        </div>
        {/*<div className={'ember-per-second'}>Total Clicks: {appState.totalClicks}</div>*/}
      </div>
      <div className="growing-flame-container">
        <img
          style={flameImageStyle}
          src={flame}
          alt={"Flame level 1"}
          draggable="false"
        />
      </div>
    </div>
  );
}
