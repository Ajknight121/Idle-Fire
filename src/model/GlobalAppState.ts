import {Logger} from "../utils/logger";
import {IUpgrade} from "./Upgrade";
import {GameUpgradesFactory} from "../domain/gameUpgrades";

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

  // TODO Move to config file so its always on for local dev and always off for deployed env
  static shouldLog = false;

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
      upgrades: appState.upgrades.map(u => GameUpgradesFactory.getEmberBasedUpgrade(u, appState.totalEmbers))

    }
  }
  static addEmbersPerSecondOnTick(appState: IGlobalAppState): IGlobalAppState {
    const updatedEmbers = {
      ...appState,
      embers: appState.embers + appState.embersPerSecond,
      totalEmbers: appState.totalEmbers + appState.embersPerSecond,
    };
    GlobalAppState.logStateToConsole(updatedEmbers);
    const finalState = this.updateStateUpgrades(updatedEmbers);
    GlobalAppState.logStateToConsole(finalState);
    return finalState;
  }

  static addToEmbersPerSec(
    numberOfEmbersPerSecToAdd: number,
    appState: IGlobalAppState
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
  static addsEmberToTotal = ({
    embers,
    totalEmbers,
    ...restState
  }: IGlobalAppState): IGlobalAppState => {
    const updatedEmbers = {
      ...restState,
      embers: embers + restState.clickPower,
      totalClicks: restState.totalClicks + 1,
      totalEmbers: totalEmbers + restState.clickPower,
      //We'll reset this based on a contant time set in the app //TIME_TO_DISPLAY_CLICK_ANIMATION
      displayAnimationForClick: true,
    };
    const updatedUpgrades = this.updateStateUpgrades(updatedEmbers)
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

  /** Every time you buy something we need to deduct your embers. */
  static deductEmbers = (
    deduction: number,
    { embers, ...restState }: IGlobalAppState
  ): IGlobalAppState => {
    const newState = {
      ...restState,
      embers: embers - deduction,
    };
    GlobalAppState.logStateToConsole(newState);
    return newState;
  };

  /** Every time you buy something we need to deduct your embers. */
  static upgradeEmbersPerClick = (
    deduction: number,
    { embers, ...restState }: IGlobalAppState
  ): IGlobalAppState => {
    const newState = {
      ...restState,
      embers: embers - deduction,
      clickPower: restState.clickPower + 1, // TODO give the quantity to add as a parameter
    };
    GlobalAppState.logStateToConsole(newState);
    return newState;
  };

  static updateBuyQuantity(
    buyQuantity: number,
    appState: IGlobalAppState
  ): IGlobalAppState {
    const updatedBuyState = {
      ...appState,
      buyQuantity,
    }
    return this.updateStateUpgrades(updatedBuyState);
  }
  static buyUpgrade(
      upgrade: IUpgrade,
      appState: IGlobalAppState
  ): IGlobalAppState {
    // if (buyQuantity !== 0 || appState.embers < deduct) { check all conditions before
    //
    // }
    const upgrades = appState.upgrades.map(u => {
      if (upgrade.upgradeName !== u.upgradeName) {
        return u
      } else {
        let copyOfClickedUpgrade = Object.assign({}, upgrade);
        copyOfClickedUpgrade.quantity += appState.buyQuantity;
        copyOfClickedUpgrade.upgradeCost += 5 * appState.buyQuantity;
        return copyOfClickedUpgrade
      }
    })
    const newState: IGlobalAppState = {
      ...appState,
      embers: appState.embers - (upgrade.upgradeCost * appState.buyQuantity),
      upgrades,
      embersPerSecond: appState.embersPerSecond + (upgrade.EPS * appState.buyQuantity)
      // embersPerSecond: appState.embersPerSecond + upgrade.embersPerSecond, //need to add embers per second for that particular upgrade or decide how to track it
    };
    GlobalAppState.logStateToConsole(newState);
    return newState;
  }

  static increaseUpgradeLvl(
      upgrade: IUpgrade,
      appState: IGlobalAppState,
  ): IGlobalAppState {
    upgrade.quantity += 1;
    return {
      ...appState,
    }
  }

  /** Everytime the cursor moves update state with the last position so we can trigger images and animations based on the new cursor position. */
  static updateStateWithCursorMovement(
      appState: GlobalAppState,
      clientX: number,
      clientY: number
  ) {
    return {
      ...appState,
      currCursorX: clientX,
      currCursorY: clientY,
    };
  }
}
