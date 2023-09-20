import { createSlice } from "@reduxjs/toolkit"
import { TrackItemType } from '../../requests/payloadTypes'

const searchCache = createSlice({
    name: 'cachedResults',
    initialState: {
        searchQuery: '',
        tracks: [] as TrackItemType[]
    },
    reducers: {
        saveSearchResults(state, action: { payload: { searchQuery: string, tracks: TrackItemType[] }} ) {
            const { tracks, searchQuery } = action.payload

            if (tracks?.length && typeof searchQuery === 'string' && searchQuery) {
                return {
                    ...state,
                    searchQuery,
                    tracks
                }
            }
        },
        emptySearchResults(state) {
            return {
                ...state,
                searchQuery: '',
                tracks: []
            }
        },
        saveSearchQuery(state, action: { payload: { searchQuery: string }}) {
            const { searchQuery } = action.payload
            
            return {
                ...state,
                searchQuery,
            }
        }
    }
})

export const { saveSearchResults, emptySearchResults, saveSearchQuery } = searchCache.actions
export default searchCache.reducer