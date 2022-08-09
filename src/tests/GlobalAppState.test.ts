import { GlobalAppState } from "../model/GlobalAppState";
import {IClickUpgrade, IUpgrade} from "../model/Upgrade";
import {UpgradeNames} from "../domain/gameUpgrades";
/** The global app state is our SUT aka subject under test, so all assertions in this test suite should be on our SUT */
describe("global app state", () => {
  it("addToEmbersPerSec", () => {
    //Arrange
    const epsToAdd = 1;
    const mockEmbersPerSecond = 0;
    const mockEmbers = 10;
    let mockState = new GlobalAppState();
    mockState.embers = mockEmbers;
    mockState.embersPerSecond = mockEmbersPerSecond;
    //Act
    const newState = GlobalAppState.addToEmbersPerSec(mockState, epsToAdd);
    //Assert
    expect(newState.embersPerSecond).toBe(epsToAdd);
    expect(newState.embers).toBe(mockEmbers);
  });
  it("addEmbersPerSecondOnTick", () => {
    //Arrange
    const mockEmbersPerSecond = 5;
    const mockEmbers = 10;
    const totalMockEmbers = 10;
    let mockState = new GlobalAppState();
    mockState.embers = mockEmbers;
    mockState.embersPerSecond = mockEmbersPerSecond;
    mockState.totalEmbers = totalMockEmbers;
    //Act
    const newState = GlobalAppState.addEmbersPerSecondOnTick(mockState);
    //Assert
    expect(newState.embers).toBe(mockEmbers + mockEmbersPerSecond);
    expect(newState.totalEmbers).toBe(totalMockEmbers + mockEmbersPerSecond);
  });
  describe("addsEmberToTotal", () => {
    let mockState: GlobalAppState;
    const mockClickPower = 10;
    const mockEmbers = 0;
    const mockTotalClicks = 0;
    beforeEach(() => {
      //Arrange
      mockState = new GlobalAppState();
      mockState.clickPower = mockClickPower;
      mockState.embers = mockEmbers;
      mockState.totalClicks = mockTotalClicks;
    });
    // it("increases total clicks", () => {
    //   //Act
    //   const newState = GlobalAppState.addsEmberToTotal(mockState);
    //   //Assert
    //   expect(newState.totalClicks).toBe(mockTotalClicks + 1);
    // });
    it("increases embers", () => {
      //Act
      const newState = GlobalAppState.handleUserFireClick(mockState);
      //Assert
      expect(newState.embers).toBe(mockEmbers + mockClickPower);
    });
    it("increases totalEmbers", () => {
      //Act
      const newState = GlobalAppState.handleUserFireClick(mockState);
      //Assert
      expect(newState.totalEmbers).toBe(mockEmbers + mockClickPower);
    });
  });
  it("deductEmbers", () => {
    //Arrange
    const mockDeduction = 10;
    const mockEmbers = 10;
    let mockState = new GlobalAppState();
    mockState.embers = mockEmbers;
    //Act
    const newState = GlobalAppState.deductEmbers(mockState, mockDeduction);
    //Assert
    expect(newState.embers).toBe(mockEmbers - mockDeduction);
  });
  describe("upgradeEmbersPerClick", () => {
    const mockEmbers = 10;
    const mockUpgrade: IClickUpgrade = {
      unlocked: true,
      upgradeName: UpgradeNames.clickPower,
      upgradeCost: 50,
      EPC: 2,
      quantity: 1,
      description: "Each upgrade doubles click power"
    }
    let mockState = new GlobalAppState();
    beforeEach(() => {
      //Arrange
      mockState = new GlobalAppState();
      mockState.embers = mockEmbers;
    });
    it("deducts embers", () => {
      //Act
      const newState = GlobalAppState.upgradeEmbersPerClick(
        mockState,
        mockUpgrade
      );
      //Assert
      expect(newState.embers).toBe(mockState.embers - mockUpgrade.upgradeCost);
    });
    it("adds click power", () => {
      //Act
      const newState = GlobalAppState.upgradeEmbersPerClick(
        mockState,
        mockUpgrade
      );
      //Assert
      expect(newState.clickPower).toBe(mockUpgrade.EPC * 2);
    });
    describe("Purchases multiple click upgrades", () => {
      //Act
      const newState = GlobalAppState.upgradeEmbersPerClick(
          mockState,
          mockUpgrade
      );
      //Assert
      expect(newState.clickPower).toBe(mockUpgrade.EPC * 2);
    });
  });
});
