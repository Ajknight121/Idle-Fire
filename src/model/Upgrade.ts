export interface IUpgrade {
    name: string;
    cost: number; //cost in embers that were created
    level: number; // not clear on use of level
    // multiplierPercent: number  //3.5 of an ember
}

// export interface AutoClickUpgrade extends IUpgrade {

// }

// export class Upgrade implements IUpdate {
//     multiplierPercent = 60  //3.5 of an ember
// }