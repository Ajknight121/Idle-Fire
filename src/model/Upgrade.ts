export interface IUpgrade {
  classname?: string;
  unlocked: boolean;
  upgradeName: string;
  upgradeCost: number; //cost in embers that were created
  lvl?: number; // Number of times upgrade is purchased
  // unlock(condition:number):void; // Function to change upgrade from locked/hidden to unlocked/shown
  // multiplierPercent: number  //3.5 of an ember
}

// export interface AutoClickUpgrade extends IUpgrade {

// }

// export class Upgrade implements IUpdate {
//     multiplierPercent = 60  //3.5 of an ember
// }
