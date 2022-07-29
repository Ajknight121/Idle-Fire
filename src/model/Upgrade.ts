export interface IUpgrade {
  classname?: string;
  unlocked: boolean;
  upgradeName: string;
  originalUpgradeCost: number;
  upgradeCost: number;
  value: number;
  lvl: number; // Number of times upgrade is purchased
}

export interface IBaseUpgrade {
  upgradeName: string;
  originalUpgradeCost: number;
  description: string;
}
