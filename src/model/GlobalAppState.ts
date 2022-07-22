export interface IGlobalAppState {
  time: number;
  clickPower: number; //Increased by ClickPowerUpgrade
  embers: number; //Currency to accumulate
  embersPerSecond: number; //Increased by EmbersPerSecondUpgrade
  totalClicks: number;
  //Cursor
  currCursorX: number;
  currCursorY: number;
  displayAnimationForClick: boolean;
}

/**  */
export class GlobalAppState implements IGlobalAppState {
  time = 0;
  clickPower = 1;
  embers = 0;
  embersPerSecond = 0;
  totalClicks = 0;
  //Cursor
  currCursorX = 0;
  currCursorY = 0;
  displayAnimationForClick = false;

  // TODO Move to config file so its always on for local dev and always off for deployed env
  static shouldLog = true;

  static logStateToConsole = (state: IGlobalAppState) => {
    console.table(state);
  };

  /** Every tick of application logic should increase the number of embers by the number of embers per second
   * @param appState Is used to construct a new state with an updated embers value only if ___
   */
  static addEmbersPerSecondOnTick(appState: IGlobalAppState): IGlobalAppState {
    const newState = {
      ...appState,
      embers: appState.embers + appState.embersPerSecond,
    };
    GlobalAppState.logStateToConsole(newState);
    return newState;
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

  /** Every time you click the fire, you earn an ember based on your click power and we increment the global count of total clicks for the app game session. */
  static addsEmberToTotal = ({
    embers,
    ...restState
  }: IGlobalAppState): IGlobalAppState => {
    const newState: IGlobalAppState = {
      ...restState,
      embers: embers + restState.clickPower,
      totalClicks: restState.totalClicks + 1,
      //We'll reset this based on a contant time set in the app //TIME_TO_DISPLAY_CLICK_ANIMATION
      displayAnimationForClick: true,
    };
    GlobalAppState.logStateToConsole(newState);
    return newState;
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
