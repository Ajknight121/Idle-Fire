import { GameUpgradesFactory } from "../domain/gameUpgrades";
import { GlobalAppState } from "../model/GlobalAppState";
import { IGlobalAppProps } from "./App.model";
import Upgrade from "./Upgrade";
import Statistics from "./Statistics";
import {IUpgrade} from "../model/Upgrade";

export default function UpgradeContainer(props: IGlobalAppProps) {

  const buyUpgrade = (embers: number, cost: number, adder:number):boolean => {
    console.log(`Buying upgrade`);
    // This pattern is what you'll learn when you start implementing actions and reducers as in the Redux pattern.
    // Main point, we keep state immutable, hence spread operator to create new copies of state or in order words, we never mutate state directly as in
    // props.appState.clickPower = props.appState.clickPower + 1

    if (embers < cost) {
      return false;
    }
    const deductedEmbersState = GlobalAppState.deductEmbers(
      cost,
      props.appState
    );

    const newState = GlobalAppState.addToEmbersPerSec(adder, deductedEmbersState);

    props.setAppState(newState);
    return true;
  };

  const upgradeQuantity = (e:React.ChangeEvent<HTMLInputElement>, buyQuantity:number):void => {
    props.setAppState(GlobalAppState.updateBuyQuantity(buyQuantity, props.appState))
  }

  const upgradeAction = (embers: number, upgrade: IUpgrade, buyQuantity:number) => {
    for (let i = 0; i < buyQuantity; i++) {
      if (buyUpgrade(embers, upgrade.upgradeCost, 1)) {
        props.setAppState(GlobalAppState.increaseUpgradeLvl(upgrade,props.appState))
      }
    }

  return;
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
          {/*TODO: An onclick event could be added to the upgrades div that identifies which upgrade was clicked*/}
          <div onClick={() => buyUpgrade(props.appState.embers, 10, 1)}>
            <Upgrade
                key={"Grass plucker"}
                unlocked={true}
                classname={props.appState.embers >= 10 ? "upgrade-available" : "upgrade-unavailable"}
                upgradeName={"Grass plucker"}
                originalUpgradeCost={10}
                upgradeCost={10}
                value={1}
                lvl={1}
            />
          </div>
          {GameUpgradesFactory.getGameUpgrades(props.appState).map((upgrade) =>
              <Upgrade
                  key={upgrade.upgradeName}
                  {...upgrade}
                  classname={(upgrade.unlocked && GameUpgradesFactory.canAfford(upgrade,props.appState.embers)) ? "upgrade-available" : "upgrade-unavailable"}
                  appState={props.appState}
              />
          )}

        </div>
        <Statistics {...props.appState}/>
    </div>
  );
}
