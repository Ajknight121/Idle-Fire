import { IAppAction } from "../domain/appActions";
import { GameUpgradesFactory } from "../domain/gameUpgrades";
import { Logger } from "../utils/logger";
import { IUpgrade } from "./Upgrade";

export interface IGlobalAppState {
  time: number;
  clickPower: number; //Increased by ClickPowerUpgrade
  embers: number; //Currency to accumulate
  embersPerSecond: number; //Increased by EmbersPerSecondUpgrade
  totalClicks: number;
  totalEmbers: number;
  buyQuantity: number;
  upgrades: IUpgrade[];
  //Cursor
  currCursorX: number;
  currCursorY: number;
  displayAnimationForClick: boolean;
}

export class GlobalAppState implements IGlobalAppState {
  time = 0;
  clickPower = 1;
  embers = 0;
  embersPerSecond = 0;
  totalClicks = 0;
  buyQuantity = 1;
  totalEmbers = 0;
  upgrades = GameUpgradesFactory.getInitialUpgrades();
  //Cursor
  currCursorX = 0;
  currCursorY = 0;
  displayAnimationForClick = false;

  static logStateToConsole = (state: IGlobalAppState) => {
    Logger.table(state);
  };

  /** Every tick of application logic should increase the number of embers by the number of embers per second
   * @param appState Is used to construct a new state with an updated embers value only if ___
   */
  /** Updates the state of each upgrade with updated unlock status based on totalEmbers
   *
   * @param appState
   */
  static updateStateUpgrades(appState: IGlobalAppState): IGlobalAppState {
    return {
      ...appState,
      upgrades: appState.upgrades.map((u) =>
        GameUpgradesFactory.getEmberBasedUpgrade(u, appState.totalEmbers)
      ),
    };
  }
  static addEmbersPerSecondOnTick(appState: IGlobalAppState): IGlobalAppState {
    const updatedEmbers: IGlobalAppState = {
      ...appState,
      embers: appState.embers + appState.embersPerSecond,
      totalEmbers: appState.totalEmbers + appState.embersPerSecond,
    };
    const finalState = GlobalAppState.updateStateUpgrades(updatedEmbers);
    GlobalAppState.logStateToConsole(finalState);
    return finalState;
  }

  //TODO Is this still used?
  static addToEmbersPerSec(
    appState: IGlobalAppState,
    numberOfEmbersPerSecToAdd: number
  ): IGlobalAppState {
    const newState = {
      ...appState,
      embersPerSecond: appState.embersPerSecond + numberOfEmbersPerSecToAdd,
    };
    GlobalAppState.logStateToConsole(newState);
    return newState;
  }

  /** Every time you click the fire, you earn a number of embers based on your click power and we increment the global
   *  count of total clicks for the app game session. */
  static handleUserFireClick = (appState: IGlobalAppState): IGlobalAppState => {
    const { embers, clickPower, totalClicks, totalEmbers } = appState;
    const updatedEmbersState: IGlobalAppState = {
      ...appState,
      embers: embers + clickPower,
      totalClicks: totalClicks + 1,
      totalEmbers: totalEmbers + clickPower,
      //We'll reset this based on a contant time set in the app //TIME_TO_DISPLAY_CLICK_ANIMATION
      displayAnimationForClick: true,
    };
    const updatedUpgrades =
      GlobalAppState.updateStateUpgrades(updatedEmbersState);
    GlobalAppState.logStateToConsole(updatedUpgrades);
    return updatedUpgrades;
  };

  /** Gets called after a certain amount of time after a click gets handled */
  static resetClickAnimationToHidden(appState: IGlobalAppState) {
    return {
      ...appState,
      displayAnimationForClick: false,
    };
  }

  /** A wrapper function for the two discrete mutations of deducting embers and adding to embers per second */
  static handleUpgradePurchase = (
    appState: GlobalAppState,
    action: IAppAction
  ) => {
    //Consider consolitdating these state mutations into one function, here if sub functions aren't used elsewhere
    const deductedEmbersState = GlobalAppState.deductEmbers(
      appState,
      action.payload.cost
    );

    const newState = GlobalAppState.addToEmbersPerSec(
      deductedEmbersState,
      action.payload.value
    );
    return newState;
  };

  /** Every time you buy something we need to deduct your embers. */
  static deductEmbers = (
    appState: IGlobalAppState,
    deduction: number
  ): IGlobalAppState => {
    const newState = {
      ...appState,
      embers: appState.embers - deduction,
    };
    GlobalAppState.logStateToConsole(newState);
    return newState;
  };

  //TODO Uncomment when going to be used to reduce confusing during refactoring and debugging
  /** Every time you buy something we need to deduct your embers. */
  // static upgradeEmbersPerClick = (
  //   deduction: number,
  //   { embers, ...restState }: IGlobalAppState
  // ): IGlobalAppState => {
  //   const newState = {
  //     ...restState,
  //     embers: embers - deduction,
  //     clickPower: restState.clickPower + 1, // TODO give the quantity to add as a parameter
  //   };
  //   GlobalAppState.logStateToConsole(newState);
  //   return newState;
  // };

  /** Handles payload with a number for a new buy quantity */
  static updateBuyQuantity(
    appState: IGlobalAppState,
    payload: number
  ): IGlobalAppState {
    debugger;
    const updatedBuyState = {
      ...appState,
      buyQuantity: payload,
    };
    return GlobalAppState.updateStateUpgrades(updatedBuyState);
  }

  static buyUpgrade(
    appState: IGlobalAppState,
    upgrade: IUpgrade
  ): IGlobalAppState {
    const upgrades = appState.upgrades.map((u) => {
      if (upgrade.upgradeName !== u.upgradeName) {
        return u;
      } else {
        let copyOfClickedUpgrade = Object.assign({}, upgrade);
        copyOfClickedUpgrade.quantity += appState.buyQuantity;
        copyOfClickedUpgrade.upgradeCost += 5 * appState.buyQuantity;
        return copyOfClickedUpgrade;
      }
    });
    const newState: IGlobalAppState = {
      ...appState,
      embers: appState.embers - upgrade.upgradeCost * appState.buyQuantity,
      upgrades,
      embersPerSecond:
        appState.embersPerSecond + upgrade.EPS * appState.buyQuantity,
      // embersPerSecond: appState.embersPerSecond + upgrade.embersPerSecond, //need to add embers per second for that particular upgrade or decide how to track it
    };
    GlobalAppState.logStateToConsole(newState);
    return newState;
  }

  static increaseUpgradeLvl(
    appState: IGlobalAppState,
    upgrade: IUpgrade
  ): IGlobalAppState {
    upgrade.quantity += 1;
    return {
      ...appState,
    };
  }

  /** Everytime the cursor moves update state with the last position so we can trigger images and animations based on the new cursor position. */
  static updateStateWithCursorMovement(
    appState: GlobalAppState,
    event: { clientX: number; clientY: number }
  ) {
    return {
      ...appState,
      currCursorX: event.clientX,
      currCursorY: event.clientY,
    };
  }
}
