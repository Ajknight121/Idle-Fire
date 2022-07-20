import { gameUpgrades } from "../domain/gameUpgrades";
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
      <div className="upgrade-label">Upgrades</div>
      <div className="upgrade-label">Total Embers {props.appState.embers}</div>
      <div className={"upgrade-quantity"}>
        Buy:
        <input type={"radio"} value={"1"} name={"quantity"} /> x1
        <input type={"radio"} value={"10"} name={"quantity"} /> x10
        <input type={"radio"} value={"100"} name={"quantity"} /> x100
      </div>
        <div className={"upgrades"}>
          {gameUpgrades.map((upgrade) =>
            props.appState.embers >= upgrade.upgradeCost ? (
              <Upgrade upgradeName={upgrade.upgradeName} upgradeCost={upgrade.upgradeCost} lvl={upgrade.lvl}/>
            ) : null
          )}

          {/* // Right now the upgrade works but since our increase of ember is on a tick interval, we're losing context of the embers per second */}
          {props.appState.embers > 12 && (
            <div onClick={() => buyUpgrade()} className="upgrade-unavailable">
              <div className={"upgrade-name"}>Add 1 ember per sec</div>
            </div>
          )}
        </div>
    </div>
  );
}
