export interface IGlobalAppState {
  time: number;
  clickPower: number; //Increased by ClickPowerUpgrade
  embers: number; //Currency to accumulate
  embersPerSecond: number; //Increased by EmbersPerSecondUpgrade
  totalClicks: number;
}

/**  */
export class GlobalAppState implements IGlobalAppState {
  time = 0
  clickPower = 1;
  embers = 0;
  embersPerSecond = 0;
  totalClicks = 0;
  
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
    const newState = {
      ...restState,
      embers: embers + restState.clickPower,
      totalClicks: restState.totalClicks + 1,
    };
    GlobalAppState.logStateToConsole(newState);
    return newState;
  };

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
}
