import { GameUpgradesFactory } from "../domain/gameUpgrades";
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
          {/*TODO: An onclick event could be added to the upgrades div that identifies which upgrade was clicked*/}
          <div onClick={() => buyUpgrade(props.appState.embers, 10)}>
            <Upgrade
                key={"Grass plucker"}
                unlocked={true}
                classname={props.appState.embers >= 10 ? "upgrade-available" : "upgrade-unavailable"}
                upgradeName={"Grass plucker"}
                originalUpgradeCost={10}
                upgradeCost={10}
                lvl={1}
            />
          </div>
          {GameUpgradesFactory.getGameUpgrades(props.appState).map((upgrade) =>
              <Upgrade
                  key={upgrade.upgradeName}
                  {...upgrade}
                  classname={(upgrade.unlocked && GameUpgradesFactory.canAfford(upgrade,props.appState.embers)) ? "upgrade-available" : "upgrade-unavailable"}
              />
          )}

        </div>
        <Statistics {...props.appState}/>
    </div>
  );
}
