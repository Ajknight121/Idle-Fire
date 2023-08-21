import { IUpgrade } from "./Upgrade";
import { IGlobalAppState } from "./GlobalAppState";

export enum UpgradeType {
  PRODUCER_UPGRADE = "Ember Producer",
  CLICK_UPGRADE = "Click Upgrade",
}

export enum UpgradeNames {
  clickPower = "Click Power",
  globalMultiplier = "Global Multi",
  clickMultiplier = "Click Multi",
  grassPlucker = "Grass Plucker",
  stickThrower = "Stick Thrower",
  lighterThrower = "Lighter Thrower",
  logChucker = "Log Chucker",
  gasolineThrower = "Gasoline Thrower",
  tireDumper = "Tire Dumper",
  coalShucker = "Coal Shucker",
}

const descriptions: string[] = [
    "Get a friend to sit by the fire and pull some grass.",
    "Hire someone to find nearby sticks for the fire.",
    "Someone found a collection of lighters, and some still have fuel!",
    "A dedicated woodsman to provide lumber",
    "Gasoline and fire go BOOM!",
    "It's bad for the environment, but its in great supply!",
    "Black, shiny, lightweight, you know the stuff"
]


/** Example of the factory design pattern from GoF book
 * https://en.wikipedia.org/wiki/Factory_method_pattern
 */
export class GameUpgradesFactory {
  
  static getInitialUpgrades(
    appState: IGlobalAppState = {} as IGlobalAppState,
    type: UpgradeType,
  ): IUpgrade[] {
    switch (type) {
      case UpgradeType.PRODUCER_UPGRADE:
        return [
          {
            unlocked: true,
            upgradeName: UpgradeNames.grassPlucker,
            upgradeCost: 20,
            power: 1,
            quantity: 0,
              description: descriptions[0],
          },
          {
            unlocked: true,
            upgradeName: UpgradeNames.stickThrower,
            upgradeCost: 125,
            power: 10,
            quantity: 0,
              description: descriptions[1],
          },
          GameUpgradesFactory.updateEmberBasedUpgrade(
            {
              upgradeName: UpgradeNames.lighterThrower,
              upgradeCost: 1500,
              power: 80,
              quantity: 0,
                description: descriptions[2],
            },
            appState.totalEmbers ?? 0
          ),
          GameUpgradesFactory.updateEmberBasedUpgrade(
            {
              upgradeName: UpgradeNames.logChucker,
              upgradeCost: 25000,
              power: 400,
              quantity: 0,
                description: descriptions[3],
            },
            appState.totalEmbers ?? 0
          ),
          GameUpgradesFactory.updateEmberBasedUpgrade(
            {
              upgradeName: UpgradeNames.gasolineThrower,
              upgradeCost: 300000,
              power: 1100,
              quantity: 0,
                description: descriptions[4],
            },
            appState.totalEmbers ?? 0
          ),
          GameUpgradesFactory.updateEmberBasedUpgrade(
            {
              upgradeName: UpgradeNames.tireDumper,
              upgradeCost: 500000,
              power: 17600,
              quantity: 0,
                description: descriptions[5],
            },
            appState.totalEmbers ?? 0
          ),
          GameUpgradesFactory.updateEmberBasedUpgrade(
            {
              upgradeName: UpgradeNames.coalShucker,
              upgradeCost: 1000000,
              power: 12000,
              quantity: 0,
                description: descriptions[6],
            },
            appState.totalEmbers ?? 0
          ),
        ]
      case UpgradeType.CLICK_UPGRADE:
        return [
          {
            unlocked: true,
            upgradeName: UpgradeNames.clickPower,
            upgradeCost: 50,
            power: 1,
            quantity: 1,
            description: "Each upgrade doubles click power"
          },
          {
            unlocked: true,
            upgradeName: UpgradeNames.globalMultiplier,
            upgradeCost: 150,
            power: 1,
            quantity: 1,
            description: "Multiplies ember gain from all sources!"
          }
          // {
          //   unlocked: true,
          //   upgradeName: UpgradeNames.clickMultiplier,
          //   upgradeCost: 5000,
          //   EPC: 1.0,
          //   quantity: 0,
          //     description: "Each upgrade raises the maximum click multiplier"
          // },
        ]
    }
    ;
  }

  static canAfford(
    u: IUpgrade,
    appState: IGlobalAppState
  ): boolean {
    return u.upgradeCost * appState.buyQuantity <= appState.embers;
  }

  static isUnlocked(u: IUpgrade | Partial<IUpgrade>, e: number): boolean {
    return u.unlocked === true || (u.upgradeCost ?? 999) * 0.3 <= e;
  }

  static updateEmberBasedUpgrade(
    customProps: IUpgrade | Partial<IUpgrade>,
    totalEmbers: number
  ): IUpgrade {
    return {
      ...customProps,
      unlocked: GameUpgradesFactory.isUnlocked(customProps, totalEmbers),
    } as IUpgrade;
  }
}
