import { GlobalAppState } from "../model/GlobalAppState";
/** The global app state is our SUT aka subject under test, so all assertions in this test suite should be on our SUT */
describe("global app state", () => {
  it("addEmbersPerSecondOnTick", () => {
    //Arrange
    const mockEmbersPerSecond = 5;
    const mockEmbers = 10;
    let mockState = new GlobalAppState();
    mockState.embers = mockEmbers;
    mockState.embersPerSecond = mockEmbersPerSecond;
    //Act
    const newState = GlobalAppState.addEmbersPerSecondOnTick(mockState);
    //Assert
    expect(newState.embers).toBe(mockEmbers + mockEmbersPerSecond);
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
      const newState = GlobalAppState.addsEmberToTotal(mockState);
      //Assert
      expect(newState.embers).toBe(mockEmbers + mockClickPower);
    });
  });
  it("deductEmbers", () => {
    //Arrange
    const mockDeduction = 10;
    const mockEmbers = 10;
    let mockState = new GlobalAppState();
    mockState.embers = mockEmbers;
    //Act
    const newState = GlobalAppState.deductEmbers(mockDeduction, mockState);
    //Assert
    expect(newState.embers).toBe(mockEmbers - mockDeduction);
  });
  describe("upgradeEmbersPerClick", () => {
    const mockDeduction = 10;
    const mockEmbers = 10;
    let mockState = new GlobalAppState();
    beforeEach(() => {
      //Arrange
      mockState = new GlobalAppState();
      mockState.embers = mockEmbers;
    });
    it("deducts embers", () => {
      //Act
      const newState = GlobalAppState.upgradeEmbersPerClick(
        mockDeduction,
        mockState
      );
      //Assert
      expect(newState.embers).toBe(mockEmbers - mockDeduction);
    });
    it("adds click power", () => {
      //Act
      const newState = GlobalAppState.upgradeEmbersPerClick(
        mockDeduction,
        mockState
      );
      //Assert
      expect(newState.clickPower).toBe(mockState.clickPower + 1);
    });
  });
});
