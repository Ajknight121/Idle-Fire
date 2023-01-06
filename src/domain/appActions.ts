import { GlobalAppState } from "../model/GlobalAppState";

export enum AppActionsNames {
  GAME_LOOP_TICK = "GAME_LOOP_TICK",
  CLEAR_GAME_DATA = "CLEAR_GAME_DATA",


  FIRE_CLICK = "FIRE_CLICK",
  MOUSE_MOVE = "MOUSE_MOVE",

  MULTIPLIER_CHANGE = "MULTIPLIER_CHANGE",
  UPGRADE_PURCHASE = "UPGRADE_PURCHASE",
  CLICK_PURCHASE = "CLICK_PURCHASE"
}
/** Utility function to dispatch actions with an optional payload with a passed type */
export const createActionWithPayload = <T>(
  type: AppActionsNames,
  payload: T = {} as T
) => ({
  type,
  payload,
});

export interface IAppAction {
  type: AppActionsNames;
  payload?: any;
}

export const ActionToFuncMap: Record<AppActionsNames, Function> = {
  [AppActionsNames.GAME_LOOP_TICK]: GlobalAppState.addEmbersPerSecondOnTick,
  [AppActionsNames.CLEAR_GAME_DATA]: GlobalAppState.clearGameData,

  //User Cursor Actions
  [AppActionsNames.FIRE_CLICK]: GlobalAppState.handleUserFireClick,
  [AppActionsNames.MOUSE_MOVE]: GlobalAppState.updateStateWithCursorMovement,

  //User Left Menu Interactions
  [AppActionsNames.UPGRADE_PURCHASE]: GlobalAppState.buyUpgrade,
  [AppActionsNames.MULTIPLIER_CHANGE]: GlobalAppState.updateBuyQuantity,
  [AppActionsNames.CLICK_PURCHASE]: GlobalAppState.upgradeEmbersPerClick,
};
