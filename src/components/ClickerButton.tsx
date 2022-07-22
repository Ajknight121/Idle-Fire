import { CSSProperties, useCallback, useEffect } from "react";
import { TIME_TO_DISPLAY_CLICK_ANIMATION } from "../domain/contants";
import flame from "../images/flame.png";
import { GlobalAppState } from "../model/GlobalAppState";
import { IGlobalAppProps } from "./App.model";

export default function ClickerButton(props: IGlobalAppProps) {
  const { appState, setAppState } = props;
  const updateStateWithHiddenClickAnimation = useCallback(() => {
    const newState = GlobalAppState.resetClickAnimationToHidden(appState);
    setAppState(newState);
  }, [appState, setAppState]);
  const handleClick = () => {
    const newState = GlobalAppState.addsEmberToTotal(appState);
    setAppState(newState);
  };

  /** Use app start to grow the image */
  const flameImageStyle: CSSProperties = {
    display: "grid",
    placeContent: "center",
    height: `${appState.embersPerSecond + 3}vh`, //Give it a 3 percent of monitor height first size
  };

  //When the component loads trigger a set timeout if the click animation is visible
  useEffect(() => {
    if (appState.displayAnimationForClick) {
      setTimeout(() => {
        updateStateWithHiddenClickAnimation();
      }, TIME_TO_DISPLAY_CLICK_ANIMATION);
    }
  }, [updateStateWithHiddenClickAnimation, appState.displayAnimationForClick]);
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
