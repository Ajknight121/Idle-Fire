import {GameUpgradesFactory} from "../domain/gameUpgrades";
import { GlobalAppState } from "../model/GlobalAppState";
import { IGlobalAppProps } from "./App.model";
import Upgrade from "./Upgrade";
import Statistics from "./Statistics";

export default function UpgradeContainer(props: IGlobalAppProps) {
  // const costOfUpgrade = 12;
  const buyUpgrade = (embers: number, cost: number) => {
    console.log(`Buying upgrade`);
    //This pattern is what you'll learn when you start implementing actions and reducers as in the Redux pattern. Main point, we keep state immutable, hence spread operator to create new copies of state or in order words, we never mutate state directly as in
    // props.appState.clickPower = props.appState.clickPower + 1

    //Two pure functions aka no side effects - easy to test
    //Adrian: Figure out how to implement test coverage for our Global App State static functions TODO
    if (embers < cost) {
        return;
    }
    const deductedEmbersState = GlobalAppState.deductEmbers(
      cost,
      props.appState
    );

    const newState = GlobalAppState.addToEmbersPerSec(1, deductedEmbersState);

    props.setAppState(newState);
  };
  const upgradeQuantity = (e:React.ChangeEvent<HTMLInputElement>, buyQuantity:number):void => {
    props.setAppState(GlobalAppState.updateBuyQuantity(buyQuantity, props.appState))
  }

  return (
    <div className="upgrade-container">
      <div className="upgrade-label">Upgrades</div>
      <div className="upgrade-label">Total Embers {props.appState.embers}</div>
      <div className={"upgrade-quantity"}>
        Buy:
        <input type={"radio"} value={"1"} name={"quantity"} onChange={event => upgradeQuantity(event, 1)} checked={props.appState.buyQuantity === 1}/> x1
        <input type={"radio"} value={"10"} name={"quantity"} onChange={event => upgradeQuantity(event, 10)} checked={props.appState.buyQuantity === 10}/> x10
        <input type={"radio"} value={"100"} name={"quantity"} onChange={event => upgradeQuantity(event, 100)} checked={props.appState.buyQuantity === 100}/> x100
      </div>
        <div className={"upgrades"}>
          {GameUpgradesFactory.getGameUpgrades(props.appState).map((upgrade) =>
              <Upgrade
                  {...upgrade}
                  classname={GameUpgradesFactory.isAvailable(upgrade,props.appState.embers) ? "upgrade-available" : "upgrade-unavailable"}
              />
          )}
            <div onClick={() => buyUpgrade(props.appState.embers, 20)}>
              <Upgrade
                  unlocked={true}
                  classname={props.appState.embers >= 20 ? "upgrade-available" : "upgrade-unavailable"}
                  upgradeName={"Add 1 ember"}
                  upgradeCost={20}
                  lvl={1}
              />
            </div>
        </div>
        <Statistics {...props.appState}/>
    </div>
  );
}
