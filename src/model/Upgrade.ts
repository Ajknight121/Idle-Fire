export interface IUpgrade {
  upgradeName: string;
  upgradeCost: number; //cost in embers that were created
  lvl?: number; // not clear on use of level
  // multiplierPercent: number  //3.5 of an ember
}

// export interface AutoClickUpgrade extends IUpgrade {

// }

// export class Upgrade implements IUpdate {
//     multiplierPercent = 60  //3.5 of an ember
// }
