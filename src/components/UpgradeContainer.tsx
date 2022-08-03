import { useContext } from "react";
import { AppActionsNames, createActionWithPayload } from "../domain/appActions";
import { AppStateContext } from "../domain/appContext";
import { GameUpgradesFactory } from "../domain/gameUpgrades";
import { IUpgrade } from "../model/Upgrade";
import Statistics from "./Statistics";
import Upgrade from "./Upgrade";

export default function UpgradeContainer() {
  const { appState, dispatchAppAction } = useContext(AppStateContext);
  
  const getUpgradeContent = (
    upgrade: IUpgrade,
    index: number,
    array: IUpgrade[]
  ) => {
    const classForUpgrade =
      upgrade.unlocked && GameUpgradesFactory.canAfford(upgrade, appState)
        ? "upgrade-available"
        : "upgrade-unavailable";
    return (
      <Upgrade key={index} upgradeProps={upgrade} classname={classForUpgrade} />
    );
  };

  const upgradeQuantity = (
    e: React.ChangeEvent<HTMLInputElement>,
    buyQuantity: number
  ): void => {
    dispatchAppAction(
      createActionWithPayload(AppActionsNames.MULTIPLIER_CHANGE, buyQuantity)
    );
  };

  return (
    <div className="upgrade-container">
      <div className="upgrade-label">Upgrades</div>
      <div className="upgrade-label">Total Embers {appState.embers}</div>
      <div className={"upgrade-quantity"}>
        Buy:
        <input
          type={"radio"}
          value={"1"}
          name={"quantity"}
          onChange={(event) => upgradeQuantity(event, 1)}
          checked={appState.buyQuantity === 1}
        />{" "}
        x1
        <input
          type={"radio"}
          value={"10"}
          name={"quantity"}
          onChange={(event) => upgradeQuantity(event, 10)}
          checked={appState.buyQuantity === 10}
        />{" "}
        x10
        <input
          type={"radio"}
          value={"100"}
          name={"quantity"}
          onChange={(event) => upgradeQuantity(event, 100)}
          checked={appState.buyQuantity === 100}
        />{" "}
        x100
      </div>
      <div className={"upgrades"}>
        {appState.upgrades.map(getUpgradeContent)}
      </div>
      <Statistics />
    </div>
  );
}
