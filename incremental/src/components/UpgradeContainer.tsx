import React from "react";
import { GlobalAppState } from "../model/GlobalAppState";
import { IGlobalAppProps } from "./App.model";
import Upgrade from "./Upgrade";

export default function UpgradeContainer(props: IGlobalAppProps) {
  const costOfUpgrade = 12;
  const buyUpgrade = () => {
    console.log(`Buying upgrade`);
    //This pattern is what you'll learn when you start implementing actions and reducers as in the Redux pattern. Main point, we keep state immutable, hence spread operator to create new copies of state or in order words, we never mutate state directly as in
    // props.appState.clickPower = props.appState.clickPower + 1

    //Two pure functions aka no side effects - easy to test
    //Adrian: Figure out how to implement test coverage for our Global App State static functions TODO

    const deductedEmbersState = GlobalAppState.deductEmbers(
      costOfUpgrade,
      props.appState
    );

    const newState = GlobalAppState.addToEmbersPerSec(1, deductedEmbersState);

    props.setAppState(newState);
  };
  return (
    <div className="upgrade-container">
      <div className="upgrade-label">Total Embers {props.appState.embers}</div>
      <div className="upgrade-label">Upgrades</div>
      <div className={"upgrade-quantity"}>
        Buy:
        <input type={"radio"} value={"1"}/> x1
        <input type={"radio"} value={"10"}/> x10
        <input type={"radio"} value={"100"}/> x100
      </div>
      {props.appState.embers > 3 && <Upgrade upgradeName={"Upgrade 1"} upgradeCost={"4"}/>}
      {props.appState.embers > 6 && <Upgrade upgradeName={"Upgrade 2"} upgradeCost={"7"}/>}
      {props.appState.embers > 9 && <Upgrade upgradeName={"Upgrade 3"} upgradeCost={"10"}/>}
      {/* // Right now the upgrade works but since our increase of ember is on a tick interval, we're losing context of the embers per second */}
      {props.appState.embers > 12 && (
        <div onClick={() => buyUpgrade()} className="upgrade-available">
          <div className={"upgrade-name"}>Add 1 ember per sec</div>
        </div>
      )}
    </div>
  );
}
