import {IAppAction} from "./appActions";
import {GameUpgradesFactory, UpgradeType} from "./gameUpgrades";
import {Logger} from "../utils/logger";
import {IEvent, IUpgrade} from "./Upgrade";
import {gameDataKey} from "./appContext";
import {GameAnalytics, IGameAnalytics} from "./gameAnalytics";
import { Fireman } from "./Upgrade";
const fireMarshalDelay = 120000;
const initFireMarshalDelay = 40000;

export interface IGlobalAppState {
  clickPower: number; //Increased by ClickPowerUpgrade
  embers: number; //Currency to accumulate
  embersPerSecond: number; //Increased by EmbersPerSecondUpgrade
  embersFromFire: number; //Embers from clicking the fire
  totalClicks: number;
  totalEmbers: number;
  buyQuantity: number;
  upgrades: IUpgrade[];
  clickUpgrades: IUpgrade[];
  //Cursor
  currCursorX: number;
  currCursorY: number;
  displayAnimationForClick: boolean;
  //Multipliers
  clickMultiplier: number;
  tickMultiplier: number;
  globalMultiplier: number;
  //Events
  FireMarshal: IEvent;
  firemenClicked: number;
  gameAnalytics: IGameAnalytics
  sessionStartTimes: number[];
  version: number; // enabled when state change causes crash
  //Meta
  currScreenX: number;
  currScreenY: number;
}

export class GlobalAppState implements IGlobalAppState {
  clickPower = 1;
  embers = 0;
  embersPerSecond = 0;
  embersFromFire = 0;
  totalClicks = 0;
  buyQuantity = 1;
  totalEmbers = 0;
  upgrades = GameUpgradesFactory.getInitialUpgrades(this, UpgradeType.PRODUCER_UPGRADE)
  clickUpgrades = GameUpgradesFactory.getInitialUpgrades(this, UpgradeType.CLICK_UPGRADE)
  //Cursor
  currCursorX = 0;
  currCursorY = 0;
  displayAnimationForClick = false;
  //Multiplier
  clickMultiplier = 1;
  tickMultiplier = 1;
  globalMultiplier = 1;
  //Events
  FireMarshal = new Fireman();
  firemenClicked = 0;
  gameAnalytics = new GameAnalytics();
  sessionStartTimes: number[] = [new Date().valueOf()];
  version = 1;
  //meta
  currScreenX = window.innerWidth;
  currScreenY = window.innerHeight;

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

  static clearGameData(appState: IGlobalAppState): GlobalAppState {
    GlobalAppState.clearGameDataInStorage();
    return new GlobalAppState();
  }

  static clearGameDataInStorage(): void {
    localStorage.removeItem(gameDataKey);
  }

  static saveGameData(appState: IGlobalAppState): void {
    localStorage.setItem(gameDataKey, JSON.stringify(appState));
  }

  static updateStateUpgrades(appState: IGlobalAppState): IGlobalAppState {
    return {
      ...appState,
      upgrades: appState.upgrades.map((u) =>
        GameUpgradesFactory.updateEmberBasedUpgrade(u, appState.totalEmbers)
      ),
    };
  }
  /** Every tick of application logic should increase the number of embers by the number of embers per second */
  static addEmbersPerSecondOnTick(appState: IGlobalAppState): IGlobalAppState {
    const mostRecentSession = appState.sessionStartTimes[appState.sessionStartTimes.length-1];
    const newGameAnalytics = GameAnalytics.handleAddEmbersPerSecondOnTick(appState.gameAnalytics, mostRecentSession)
    let newAppState = Object.assign({},appState);
    //Event activation
    const currentTime = new Date()
    // console.log(currentTime.valueOf() - mostRecentSession.valueOf())
    if (currentTime.valueOf() - mostRecentSession.valueOf() > initFireMarshalDelay && !appState.FireMarshal.unlocked) {
      console.log("Firemen approach")
      appState.FireMarshal.unlocked = true
      GlobalAppState.toggleFireman(appState,true);
    }
    if (appState.FireMarshal.unlocked && !appState.FireMarshal.isActive && currentTime.valueOf() > appState.FireMarshal.nextActivation) {
      console.log(appState.FireMarshal.isActive)
      newAppState = GlobalAppState.toggleFireman(appState, true)
    }
    const updatedEmbers: IGlobalAppState = {
      ...newAppState,
      embers: appState.embers + (appState.embersPerSecond * appState.tickMultiplier * appState.globalMultiplier * (appState.FireMarshal.isActive ? .5: 1)),
      totalEmbers: appState.totalEmbers + (appState.embersPerSecond * appState.tickMultiplier * appState.globalMultiplier * (appState.FireMarshal.isActive ? .5: 1)),
      gameAnalytics: newGameAnalytics,
      currScreenX: window.innerWidth,
      currScreenY: window.innerHeight
    };
    const finalState = GlobalAppState.updateStateUpgrades(updatedEmbers);
    GlobalAppState.logStateToConsole(finalState)
    //Extract once redux side effect is implemented
    GlobalAppState.saveGameData(appState)
    return finalState
  }

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
    const { embers, clickPower, totalClicks, totalEmbers, embersFromFire } = appState;
    const newGameAnalytics = GameAnalytics.handleClick(appState.gameAnalytics)
    const updatedEmbersState: IGlobalAppState = {
      ...appState,
      embers: embers + (clickPower * appState.clickMultiplier * appState.globalMultiplier),
      totalClicks: totalClicks + 1,
      totalEmbers: totalEmbers + (clickPower * appState.clickMultiplier * appState.globalMultiplier),
      embersFromFire: embersFromFire + (clickPower * appState.clickMultiplier * appState.globalMultiplier),
      //We'll reset this based on a constant time set in the app //TIME_TO_DISPLAY_CLICK_ANIMATION
      displayAnimationForClick: true,
      gameAnalytics: newGameAnalytics
    };
    const updatedUpgrades = GlobalAppState.updateStateUpgrades(updatedEmbersState);
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
    return GlobalAppState.addToEmbersPerSec(
        deductedEmbersState,
        action.payload.value
    );
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

  /** Handles payload with a number for a new buy quantity */
  static updateBuyQuantity(
    appState: IGlobalAppState,
    payload: number
  ): IGlobalAppState {
    const updatedBuyState = {
      ...appState,
      buyQuantity: payload,
    };
    return GlobalAppState.updateStateUpgrades(updatedBuyState);
  }

  /** Every time you buy something we need to deduct your embers. */
  static upgradeEmbersPerClick = (
    appState: GlobalAppState,
    upgrade: IUpgrade
  ): IGlobalAppState => {
    const clickUpgrades = appState.clickUpgrades.map((u) => {
      if (upgrade.upgradeName !== u.upgradeName) {
        return u;
      } else {
        let updatedUpgrade = Object.assign({}, upgrade);
        updatedUpgrade.quantity += appState.buyQuantity;
        updatedUpgrade.power = ((updatedUpgrade.power * 2) * appState.buyQuantity);
        updatedUpgrade.upgradeCost += Math.ceil(updatedUpgrade.upgradeCost * 1.5) * appState.buyQuantity;
        return updatedUpgrade;
      }
    });
    const newState = {
      ...appState,
      embers: appState.embers - upgrade.upgradeCost,
      clickUpgrades,
      clickPower: clickUpgrades[0].power, // TODO give the quantity to add as a parameter
    };
    GlobalAppState.logStateToConsole(newState);
    return newState;
  }
  static upgradeGlobalMultiplier = (
    appState: IGlobalAppState,
    upgrade: IUpgrade
  ): IGlobalAppState => {
    const clickUpgrades = appState.clickUpgrades.map((u) => {
      if (upgrade.upgradeName !== u.upgradeName) {
        return u;
      } else {
        let updatedUpgrade = Object.assign({}, upgrade);
        updatedUpgrade.quantity += appState.buyQuantity;
        updatedUpgrade.power = ((updatedUpgrade.power + 1) * appState.buyQuantity);
        updatedUpgrade.upgradeCost += Math.ceil(updatedUpgrade.upgradeCost * 7) * appState.buyQuantity;
        return updatedUpgrade;
      }
    });
    const newState = {
      ...appState,
      embers: appState.embers - upgrade.upgradeCost,
      clickUpgrades,
      globalMultiplier: clickUpgrades[1].power, // TODO give the quantity to add as a parameter
    };
    GlobalAppState.logStateToConsole(newState);
    return newState;
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
        copyOfClickedUpgrade.upgradeCost += Math.ceil(copyOfClickedUpgrade.upgradeCost * .25) * appState.buyQuantity;
        return copyOfClickedUpgrade;
      }
    });
    const newState: IGlobalAppState = {
      ...appState,
      embers: appState.embers - upgrade.upgradeCost * appState.buyQuantity,
      upgrades,
      embersPerSecond:
        appState.embersPerSecond + upgrade.power * appState.buyQuantity,
      // embersPerSecond: appState.embersPerSecond + upgrade.embersPerSecond, //need to add embers per second for that particular upgrade or decide how to track it
    };
    GlobalAppState.logStateToConsole(newState);
    return newState;
  }

  static toggleFireman(
    appState: GlobalAppState,
    payload: boolean
  ): IGlobalAppState {
    const currentTime = new Date()
    const newFireman = {
      ...appState.FireMarshal,
      isActive: payload,
      lastDisable: currentTime.valueOf(),
      nextActivation: currentTime.valueOf() + fireMarshalDelay
    }
    console.log("toggling fireman to: " + payload)

    const newState: IGlobalAppState = {
      ...appState,
      firemenClicked: appState.firemenClicked + (!payload ? 1 : 0),
      FireMarshal: newFireman
    }
    GlobalAppState.logStateToConsole(newState);
    return newState
  }

  /** Everytime the cursor moves update state with the last position so we can trigger images and animations based on the new cursor position. */
  static updateStateWithCursorMovement(
    appState: GlobalAppState,
    event: { clientX: number; clientY: number }
  ) {
    return {
      ...appState,
      currCursorX: event.clientX,
      currCursorY: event.clientY
    }
  }
}
