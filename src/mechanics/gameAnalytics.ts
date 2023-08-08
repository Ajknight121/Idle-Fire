export interface IGameAnalytics {
    storedClicksMinute: number[]
    clicksLastMinute: number
    /** in dev: TODO- the problem is that it resets and needs to be frozen during points of inactivity */
    clickRollingAveragePerMinute: number

    storedClicksSecond: number[]
    clicksLastSecond: number
}
export class GameAnalytics implements IGameAnalytics {
    public static readonly FILTER_TIME = 60000
    public static readonly INACTIVITY_TRACKER_TIMOUT = 10000
    /** Clicks per minute **/
    public clicksLastMinute: number = 0
    public clickRollingAveragePerMinute: number = 0
    public storedClicksMinute: number[] = []
    /** Clicks per Second **/
    public clicksLastSecond: number = 0
    public storedClicksSecond: number[] = []

    static handleClick(gameAnalytics: IGameAnalytics): IGameAnalytics {
        const now = new Date()
        const epochNow = now.valueOf()

        const mostRecentTime = gameAnalytics.storedClicksMinute[gameAnalytics.storedClicksMinute.length - 1]
        const shouldAffectAnalytics = GameAnalytics._shouldTrackAnalytics(epochNow, mostRecentTime)
        
        // Remove expired clicks
        /** Only remove clicks from tracked clicks per minute while active or inactivity buffer not expired */
        const clickCollection = shouldAffectAnalytics ?
            gameAnalytics.storedClicksMinute.filter(clickTime => epochNow - clickTime < GameAnalytics.FILTER_TIME) :
            gameAnalytics.storedClicksMinute
        const clickSecCollection = gameAnalytics.storedClicksSecond.filter(clickTime => epochNow - clickTime < 1000)
        // Store new click
        const newClickArray = [...clickCollection, epochNow]
        const newSecClickArray = [...clickSecCollection, epochNow]
        // Return new state of GameAnalytics
        const newGameAnalytics = {
            storedClicksMinute: newClickArray,
            clicksLastMinute: newClickArray.length,
            clickRollingAveragePerMinute: gameAnalytics.clickRollingAveragePerMinute,
            clicksLastSecond: newSecClickArray.length,
            storedClicksSecond: newSecClickArray
        }
        GameAnalytics.log(newGameAnalytics)
        return newGameAnalytics
    }
    
    static handleAddEmbersPerSecondOnTick(gameAnalytics: IGameAnalytics, mostRecentSession: number): IGameAnalytics {
        const oldCpm = gameAnalytics.clicksLastMinute
        const epochNow = new Date().valueOf()
        // const mostRecentTime = gameAnalytics.storedClicksMinute[gameAnalytics.storedClicksMinute.length - 1]
        // const shouldAffectAnalytics = (epochNow - mostRecentTime) < GameAnalytics.INACTIVITY_TRACKER_TIMOUT
        let sessionLength = epochNow - mostRecentSession
        let sessionMinLength = Math.floor(sessionLength / 60000)

        const calculatedClicks = gameAnalytics.storedClicksMinute.filter(clickTime => epochNow - clickTime < GameAnalytics.FILTER_TIME)
        const filterDownSecLastClicks = gameAnalytics.storedClicksSecond.filter(clickTime => epochNow - clickTime < 1000)

        const newSecClickArray = [...filterDownSecLastClicks]

        const newClickArray = [...calculatedClicks]
        const newCpm = Math.floor(((oldCpm * sessionMinLength) + newClickArray.length) / (sessionMinLength + 1))
        const newGameAnalytics = {
            storedClicksMinute: newClickArray,
            clicksLastMinute: newClickArray.length,
            clickRollingAveragePerMinute: newCpm,
            clicksLastSecond: newSecClickArray.length,
            storedClicksSecond: newSecClickArray
        }
        GameAnalytics.log(newGameAnalytics)
        return newGameAnalytics
    }
    /** Allows use to retain stats after inactivity */
    static _shouldTrackAnalytics(epochNow: number, mostRecentTime: number): boolean {
        return (epochNow - mostRecentTime) < GameAnalytics.INACTIVITY_TRACKER_TIMOUT

    }
    static log(gameAnalytics: IGameAnalytics): void {
        if (false) {
            console.log(`
            clicksLastMinute: ${gameAnalytics.clicksLastMinute},
            clickRollingAveragePerMinute: ${gameAnalytics.clickRollingAveragePerMinute},
    
            `)
        }
        
    }
}