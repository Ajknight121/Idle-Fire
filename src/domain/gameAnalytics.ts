export interface IGameAnalytics {
    clicksLastMinute: number
    /** in dev: TODO- the problem is that it resets and needs to be frozen during poitns of inactivity */
    clickRollingAveragePerMinute: number
    lastMinClicks: number[]

    // lastClickTimeMs: number | null
    // firstClickInMinuteTimeMs: number | null
}
export class GameAnalytics implements IGameAnalytics {
    public static readonly FILTER_TIME = 60000
    public static readonly INACTIVITY_TRACKER_TIMOUT = 30000
    /** Clicks per minute */
    public clicksLastMinute: number = 0
    public clickRollingAveragePerMinute: number = 0
    public lastMinClicks: number[] = []

    static handleClick(gameAnalytics: IGameAnalytics): IGameAnalytics {

        const now = new Date()
        const epochNow = now.valueOf()

        const mostRecentTime = gameAnalytics.lastMinClicks[gameAnalytics.lastMinClicks.length - 1]
        const shouldAffectAnalytics = GameAnalytics._shouldTrackAnalytics(epochNow, mostRecentTime)

        /** Only remove clicks from tracked clicks per minute while active or inactivity buffer not expired */
        const clickCollection = shouldAffectAnalytics ?
            gameAnalytics.lastMinClicks.filter(clickTime => epochNow - clickTime < GameAnalytics.FILTER_TIME) :
            gameAnalytics.lastMinClicks

        const newClickArray = [...clickCollection, epochNow]
        //What to do here
        const newGameAnalytics = {
            lastMinClicks: newClickArray,
            clicksLastMinute: newClickArray.length,
            clickRollingAveragePerMinute: gameAnalytics.clickRollingAveragePerMinute

        }
        GameAnalytics.log(newGameAnalytics)
        return newGameAnalytics
    }
    static handleAddEmbersPerSecondOnTick(gameAnalytics: IGameAnalytics): IGameAnalytics {
        const oldCpm = gameAnalytics.clicksLastMinute
        const epochNow = new Date().valueOf()
        const mostRecentTime = gameAnalytics.lastMinClicks[gameAnalytics.lastMinClicks.length - 1]
        const shouldAffectAnalytics = (epochNow - mostRecentTime) < GameAnalytics.INACTIVITY_TRACKER_TIMOUT

        const filterDownLastCLicks = gameAnalytics.lastMinClicks.filter(clickTime => epochNow - clickTime < GameAnalytics.FILTER_TIME)

        const newClickArray = [...filterDownLastCLicks]
        const newCpm = shouldAffectAnalytics ? Math.floor((oldCpm + newClickArray.length) / 2) : oldCpm
        const newGameAnalytics = {
            lastMinClicks: newClickArray,
            clicksLastMinute: newClickArray.length,
            clickRollingAveragePerMinute: newCpm
        }
        GameAnalytics.log(newGameAnalytics)
        return newGameAnalytics
    }
    /** Allows use to retain stats after inactivity */
    static _shouldTrackAnalytics(epochNow: number, mostRecentTime: number): boolean {
        return (epochNow - mostRecentTime) < GameAnalytics.INACTIVITY_TRACKER_TIMOUT

    }
    static log(gameAnalytics: IGameAnalytics): void {
        console.log(`
        clicksLastMinute: ${gameAnalytics.clicksLastMinute},
        clickRollingAveragePerMinute: ${gameAnalytics.clickRollingAveragePerMinute},
        `)
    }

}

const epochNowUtil = (): number => { return new Date().valueOf() }