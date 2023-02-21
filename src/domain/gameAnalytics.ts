export interface IGameAnalytics {
    clicksLastMinute: number
    /** in dev: TODO- the problem is that it resets and needs to be frozen during points of inactivity */
    clickRollingAveragePerMinute: number
    lastMinClicks: number[]

    clicksLastSecond: number
    lastSecClicks: number[]

    // lastClickTimeMs: number | null
    // firstClickInMinuteTimeMs: number | null
}
export class GameAnalytics implements IGameAnalytics {
    public static readonly FILTER_TIME = 30000
    public static readonly INACTIVITY_TRACKER_TIMOUT = 10000
    /** Clicks per minute **/
    public clicksLastMinute: number = 0
    public clickRollingAveragePerMinute: number = 0
    public lastMinClicks: number[] = []
    /** Clicks per Second **/
    public clicksLastSecond: number = 0
    public lastSecClicks: number[] = []

    static handleClick(gameAnalytics: IGameAnalytics): IGameAnalytics {
        const now = new Date()
        const epochNow = now.valueOf()

        const mostRecentTime = gameAnalytics.lastMinClicks[gameAnalytics.lastMinClicks.length - 1]
        const shouldAffectAnalytics = GameAnalytics._shouldTrackAnalytics(epochNow, mostRecentTime)

        /** Only remove clicks from tracked clicks per minute while active or inactivity buffer not expired */
        const clickCollection = shouldAffectAnalytics ?
            gameAnalytics.lastMinClicks.filter(clickTime => epochNow - clickTime < GameAnalytics.FILTER_TIME) :
            gameAnalytics.lastMinClicks
        const clickSecCollection = gameAnalytics.lastSecClicks.filter(clickTime => epochNow - clickTime < 1000)

        const newSecClickArray = [...clickSecCollection, epochNow]
        const newClickArray = [...clickCollection, epochNow]
        //What to do here
        const newGameAnalytics = {
            lastMinClicks: newClickArray,
            clicksLastMinute: newClickArray.length,
            clickRollingAveragePerMinute: gameAnalytics.clickRollingAveragePerMinute,
            clicksLastSecond: newSecClickArray.length,
            lastSecClicks: newSecClickArray
        }
        GameAnalytics.log(newGameAnalytics)
        return newGameAnalytics
    }
    static handleAddEmbersPerSecondOnTick(gameAnalytics: IGameAnalytics, mostRecentSession: number): IGameAnalytics {
        const oldCpm = gameAnalytics.clicksLastMinute
        const epochNow = new Date().valueOf()
        const mostRecentTime = gameAnalytics.lastMinClicks[gameAnalytics.lastMinClicks.length - 1]
        const shouldAffectAnalytics = (epochNow - mostRecentTime) < GameAnalytics.INACTIVITY_TRACKER_TIMOUT
        // const shouldAffectAnalytics = true;
        let sessionLength = epochNow - mostRecentSession
        let sessionMinLength = Math.floor(sessionLength / 60000)
        console.log(mostRecentSession)
        console.log(sessionLength)
        console.log(sessionMinLength)

        const calculatedClicks = shouldAffectAnalytics ? gameAnalytics.lastMinClicks.filter(clickTime => epochNow - clickTime < GameAnalytics.FILTER_TIME): gameAnalytics.lastMinClicks.map(item => item + 1000)
        const filterDownSecLastClicks = gameAnalytics.lastSecClicks.filter(clickTime => epochNow - clickTime < 1000)

        const newSecClickArray = [...filterDownSecLastClicks]

        const newClickArray = [...calculatedClicks]
        const newCpm = shouldAffectAnalytics ? Math.floor(((oldCpm * sessionMinLength) + newClickArray.length) / (sessionMinLength + 1)) : oldCpm
        console.log(shouldAffectAnalytics)
        const newGameAnalytics = {
            lastMinClicks: newClickArray,
            clicksLastMinute: newClickArray.length,
            clickRollingAveragePerMinute: newCpm,
            clicksLastSecond: newSecClickArray.length,
            lastSecClicks: newSecClickArray
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