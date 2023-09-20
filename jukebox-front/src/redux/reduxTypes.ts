import { TrackItemType } from "../requests/payloadTypes"

export type ReduxStateType = {
    cachedResultsReducer: {
        searchQuery: string
        tracks: TrackItemType[]
    },
    searchHistoryReducer: {
        searchQuery: string
    }
}