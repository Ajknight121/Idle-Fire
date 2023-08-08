import React, { createContext, useReducer } from "react";
import { GlobalAppState, IGlobalAppState } from "./GlobalAppState";
import { IAppAction } from "./appActions";
import { AppReducer } from "./appReducer";
import SparkClickAnimation from "../components/CanvasControl";
import { Fireman } from "./Upgrade";
import {GameUpgradesFactory, UpgradeType} from "./gameUpgrades";
import {GameAnalytics} from "./gameAnalytics";

function checkStoredState(storedState:GlobalAppState) {
  // let appState: IGlobalAppState = ...storedState;
  if (!storedState.clickPower) {
    storedState.clickPower = 1; // TODO: check level of click power upgrade OR make base case to reset game
  }
  if (!storedState.embers) {
    storedState.embers = 0;
  }
  if (!storedState.embersPerSecond) {
    storedState.embersPerSecond = 0;
  }
  if (!storedState.totalClicks) {
    storedState.totalClicks = 0;
  }
  if (!storedState.buyQuantity) {
    storedState.buyQuantity = 1;
  }
  if (!storedState.totalEmbers) {
    storedState.totalEmbers = 0;
  }
  if (!storedState.upgrades) {
    storedState.upgrades = GameUpgradesFactory.getInitialUpgrades(storedState, UpgradeType.PRODUCER_UPGRADE);
  }
  if (!storedState.clickUpgrades) {
    storedState.clickUpgrades = GameUpgradesFactory.getInitialUpgrades(storedState, UpgradeType.CLICK_UPGRADE);
  }
  if (!storedState.currCursorX) {
    storedState.currCursorX = 0;
  }
  if (!storedState.currCursorY) {
    storedState.currCursorY = 0;
  }
  if (!storedState.displayAnimationForClick) {
    storedState.displayAnimationForClick = false;
  }
  if (!storedState.clickMultiplier) {
    storedState.clickMultiplier = 1;
  }
  if (!storedState.tickMultiplier) {
    storedState.tickMultiplier = 1;
  }
  if (!storedState.globalMultiplier) {
    storedState.globalMultiplier = 1;
  }
  if (!storedState.FireMarshal) {
    storedState.FireMarshal = new Fireman();
  }
  if (!storedState.firemenClicked) {
    storedState.firemenClicked = 0;
  }
  if (!storedState.gameAnalytics) {
    storedState.gameAnalytics = new GameAnalytics();
  }
  if (!storedState.sessionStartTimes) {
    storedState.sessionStartTimes = [new Date().valueOf()];
  }
  return storedState
}

export const gameDataKey = 'gameData';
// TODO implement service for all localStorage actions (separate file, could be by api/web request).
const storedState: IGlobalAppState = JSON.parse(localStorage.getItem(gameDataKey) ?? '{}')

let initialAppState = (Object.keys(storedState).length) ? storedState : new GlobalAppState()
initialAppState = checkStoredState(initialAppState)

const sessionStartTimes = [...initialAppState.sessionStartTimes, new Date().valueOf()]

export type GlobalContext = {
  appState: GlobalAppState;
  dispatchAppAction: React.Dispatch<IAppAction>;
  confettiFn: any
};

export const AppStateContext = createContext<GlobalContext>({
  appState: {...initialAppState, sessionStartTimes},
  dispatchAppAction: () => { },
  confettiFn: () => { }
});

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [appState, dispatch] = useReducer(AppReducer, initialAppState);
  return (
    <AppStateContext.Provider value={{ appState, dispatchAppAction: dispatch, confettiFn: SparkClickAnimation() }}>
      {children}
    </AppStateContext.Provider>
  );
}
