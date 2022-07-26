import { IUpgrade } from "../model/Upgrade";

/** Example of the factory design pattern from GoF book
 * https://en.wikipedia.org/wiki/Factory_method_pattern
 */
export class GameUpgradesFactory {
  constructor() {}
  static getGameUpgrades(): IUpgrade[] {
    return [
      {
        unlocked: true,
        upgradeName: "Upgrade 1",
        upgradeCost: 3,
        lvl: 1,
      },
      {
        unlocked: false,
        upgradeName: "Upgrade 2",
        upgradeCost: 6,
        lvl: 1,
      },
      {
        unlocked: true,
        upgradeName: "Upgrade 3",
        upgradeCost: 9,
        lvl: 1,
      },
    ];
  }
}

export const gameUpgrades: IUpgrade[] = GameUpgradesFactory.getGameUpgrades();
