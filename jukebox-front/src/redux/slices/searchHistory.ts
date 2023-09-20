import { createSlice } from "@reduxjs/toolkit"

const searchHistory = createSlice({
    name: 'searchHistory',
    initialState: [{
        searchQuery: '',
    }],
    reducers: {
        storeSearchQuery(state, action: { payload: { searchQuery: string }}) {
            const { searchQuery } = action.payload

            if (typeof searchQuery === 'string' && searchQuery) {
                state.push({
                    searchQuery: action.payload.searchQuery
                })
            }
        }
    }
})

export const { storeSearchQuery } = searchHistory.actions
export default searchHistory.reducer