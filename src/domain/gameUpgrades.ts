import { IUpgrade } from "../model/Upgrade";
import { IGlobalAppState } from "../model/GlobalAppState";
import { fireTenders } from "../upgradeData";

export enum UpgradeNames {
  grassPlucker = "Grass Plucker",
  stickThrower = "Stick Thrower",
  lighterThrower = "lighter Thrower",
  logChucker = "log Chucker",
  gasolineThrower = "Gasoline thrower",
  tireDumper = "Tire dumper",
  coalShucker = "Coal shucker",
}

/** Example of the factory design pattern from GoF book
 * https://en.wikipedia.org/wiki/Factory_method_pattern
 */
export class GameUpgradesFactory {
  constructor() {}
  static getInitialUpgrades(
    appState: IGlobalAppState = {} as IGlobalAppState
  ): IUpgrade[] {
    return [
      {
        unlocked: true,
        upgradeName: UpgradeNames.grassPlucker,
        upgradeCost: 20,
        EPS: 1,
        quantity: 0,
      },
      GameUpgradesFactory.getEmberBasedUpgrade(
        {
          upgradeName: UpgradeNames.stickThrower,
          upgradeCost: 20,
          EPS: 5,
          quantity: 0,
        },
        appState.totalEmbers ?? 0
      ),
      GameUpgradesFactory.getEmberBasedUpgrade(
        {
          upgradeName: "Lighter thrower",
          upgradeCost: 50,
          EPS: 10,
          quantity: 0,
        },
        appState.totalEmbers ?? 0
      ),
      GameUpgradesFactory.getEmberBasedUpgrade(
        {
          upgradeName: "Log chucker",
          upgradeCost: 100,
          EPS: 25,
          quantity: 0,
        },
        appState.totalEmbers ?? 0
      ),
      GameUpgradesFactory.getEmberBasedUpgrade(
        {
          upgradeName: "Gasoline thrower",
          upgradeCost: 250,
          EPS: 100,
          quantity: 0,
        },
        appState.totalEmbers ?? 0
      ),
      GameUpgradesFactory.getEmberBasedUpgrade(
        {
          upgradeName: "Tire dumper",
          upgradeCost: 500,
          EPS: 250,
          quantity: 0,
        },
        appState.totalEmbers ?? 0
      ),
      GameUpgradesFactory.getEmberBasedUpgrade(
        {
          upgradeName: "Coal shucker",
          upgradeCost: 1000,
          EPS: 400,
          quantity: 0,
        },
        appState.totalEmbers ?? 0
      ),
    ];
  }

  // static buyUpgrades(cost, lvl, quantity) {
  //     upgradeCost = upgradeCost * lvl * buyQuantity
  // }

  static canAfford(u: IUpgrade, appState: IGlobalAppState): boolean {
    return u.upgradeCost * appState.buyQuantity <= appState.embers;
  }

  static isUnlocked(u: IUpgrade | Partial<IUpgrade>, e: number): boolean {
    return (u.upgradeCost?? 999) <= e;
  }

  static getEmberBasedUpgrade(
    customProps: IUpgrade | Partial<IUpgrade>,
    totalEmbers: number
  ): IUpgrade {
    return {
      ...customProps,
      unlocked: GameUpgradesFactory.isUnlocked(customProps, totalEmbers),
    } as IUpgrade;
  }
}
