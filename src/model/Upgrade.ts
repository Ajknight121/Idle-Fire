export interface IUpgrade {
  classname?: string;
  unlocked: boolean;
  upgradeName: string;
  upgradeCost: number;
  EPS: number; // Ember per second value added on purchase
  quantity: number; // Number of times upgrade is purchased
  description: string;
}

export interface IClickUpgrade {
  classname?: string;
  unlocked: boolean;
  upgradeName: string;
  upgradeCost: number;
  EPC: number; // Tracks click power
  quantity: number; // Number of times upgrade is purchased
  description?: string;
}

export interface IEvent {
  classname?: string;
  unlocked: boolean;
  nextActivation: number;
  lastDisable: number;
  eventName: string; // Should be made to enum list
  isActive: boolean;
}

export class Fireman implements IEvent{
  public unlocked = false
  public nextActivation = 10000
  public lastDisable = 0
  public eventName = "Fireman"
  public isActive = false
}