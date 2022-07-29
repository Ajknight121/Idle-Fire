import { IUpgrade } from "../model/Upgrade";
import { IGlobalAppState } from "../model/GlobalAppState";

/** Example of the factory design pattern from GoF book
 * https://en.wikipedia.org/wiki/Factory_method_pattern
 */
export class GameUpgradesFactory {
  constructor() {}
  static getGameUpgrades(appState: IGlobalAppState): IUpgrade[] {
    return [
      GameUpgradesFactory.getBaseUpgrade(
        {
          upgradeName: "Stick Thrower",
          originalUpgradeCost: 20,
          upgradeCost: 20 * appState.buyQuantity,
          value: 5,
          lvl: 1,
        },
        appState.totalEmbers
      ),
      GameUpgradesFactory.getBaseUpgrade(
        {
          upgradeName: "Lighter thrower",
          originalUpgradeCost: 50,
          upgradeCost: 50 * appState.buyQuantity,
            value: 10,
          lvl: 1,
        },
        appState.totalEmbers
      ),
      GameUpgradesFactory.getBaseUpgrade(
        {
          upgradeName: "Log chucker",
          originalUpgradeCost: 100,
          upgradeCost: 100 * appState.buyQuantity,
            value: 25,
          lvl: 0,
        },
        appState.totalEmbers
      ),
      GameUpgradesFactory.getBaseUpgrade(
        {
          upgradeName: "Gasoline thrower",
          originalUpgradeCost: 250,
          upgradeCost: 250 * appState.buyQuantity,
            value: 100,
          lvl: 0,
        },
        appState.totalEmbers
      ),
      GameUpgradesFactory.getBaseUpgrade(
        {
          upgradeName: "Tire dumper",
          originalUpgradeCost: 500,
          upgradeCost: 500 * appState.buyQuantity,
            value: 250,
          lvl: 0,
        },
        appState.totalEmbers
      ),
      GameUpgradesFactory.getBaseUpgrade(
        {
          upgradeName: "Coal shucker",
          originalUpgradeCost: 1000,
          upgradeCost: 1000 * appState.buyQuantity,
            value: 400,
          lvl: 0,
        },
        appState.totalEmbers
      ),
    ];
  }
  static canAfford(u: IUpgrade, e: number): boolean {
    return u.upgradeCost <= e;
  }

  static isUnlocked(u: IUpgrade, e: number): boolean {
    return u.originalUpgradeCost <= e;
  }

  static getBaseUpgrade(
    customProps: Partial<IUpgrade>,
    totalEmbers: number
  ): IUpgrade {
    return {
      unlocked: GameUpgradesFactory.isUnlocked(
        customProps as IUpgrade,
        totalEmbers
      ),
      ...customProps,
    } as IUpgrade;
  }
}
