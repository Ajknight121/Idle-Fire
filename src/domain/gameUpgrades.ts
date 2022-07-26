import { IUpgrade } from "../model/Upgrade";
import {IGlobalAppState} from "../model/GlobalAppState";

/** Example of the factory design pattern from GoF book
 * https://en.wikipedia.org/wiki/Factory_method_pattern
 */
export class GameUpgradesFactory {
  constructor() {}
  static getGameUpgrades(appState:IGlobalAppState): IUpgrade[] {
    return [
        GameUpgradesFactory.getBaseUpgrade(
            {
              upgradeName: "Upgrade 1",
              upgradeCost: 3 * appState.buyQuantity,
              lvl: 1,
            }, appState.totalClicks
        ),
      GameUpgradesFactory.getBaseUpgrade(
      {
        upgradeName: "Upgrade 2",
        upgradeCost: 6 * appState.buyQuantity,
        lvl: 1,
      },appState.totalClicks),
          GameUpgradesFactory.getBaseUpgrade(
      {
        upgradeName: "Upgrade 3",
        upgradeCost: 9 * appState.buyQuantity,
        lvl: 1,
      },appState.totalClicks),
    ];
  }
  static isAvailable(u:IUpgrade, e:number):boolean {
    return u.upgradeCost <= e;
  }

  static getBaseUpgrade(customProps:Partial<IUpgrade>, totalEmbers:number):IUpgrade {

    return {
      unlocked:GameUpgradesFactory.isAvailable(customProps as IUpgrade,totalEmbers),
    ...customProps
    } as IUpgrade
  }
}
