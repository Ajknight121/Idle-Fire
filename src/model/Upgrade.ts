export interface IUpgrade {
  classname?: string;
  unlocked: boolean;
  upgradeName: string;
  upgradeCost: number;
  EPS: number; // Value added on purchase
  quantity: number; // Number of times upgrade is purchased
}
