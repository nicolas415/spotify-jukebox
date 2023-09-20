import { FetchTokenResponse, PlaybackStateType, SearchQueryResponse, SpotifyDeviceType, TrackType } from '../_types/spotify-api'
import axios from './_axios-custom'

export const SpotifyApi = {
    /**
     * Axios instance
     */
    axios: axios,
    /**
     * Request to fetch credentials from Spotify API
     */
    async postCredentialsRequest(reqBody: URLSearchParams, authorizationString: string) {
        try {
            const { data } = await axios.post<FetchTokenResponse>('https://accounts.spotify.com/api/token', reqBody, {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${authorizationString}`
                }
            })
            return data
        }
        catch (e) {
            console.log(e)
        }
    },
    
    /**
     * Request to serach for a track, album or artist on Spotify
     */
    async getSearchRequest({ search_query, type, limit }: {search_query: string, type: 'track' | 'album' | 'artist', limit: number}) {
        const { data } = await axios.get<SearchQueryResponse<typeof type>>(`https://api.spotify.com/v1/search?q=${search_query}&type=${type}&limit=${limit}`)
        return data
    },
    
    /**
     * Request to pause the Spotify player
     */
    async putPauseRequest () {
        try {
            await axios.put(`https://api.spotify.com/v1/me/player/pause`)
        }
        catch (e) {
            throw new Error()
        }
    },
    
    /**
     * Request to play a track on the Spotify player, given a track URI and an optional device ID
     */
    async putPlayRequest(trackUri: string, deviceId?: string) {
        const deviceIdURLParam = deviceId ? `?device_id=${deviceId}` : ''
    
        try {
            const { data } = await axios.put(`https://api.spotify.com/v1/me/player/play${deviceIdURLParam}`, { uris: [trackUri] }, { 
                headers: { 'Content-Type': 'application/json'}
            })
        
            return data
        }
        catch (e) {
            console.log(e)
        }
    },
    
    /**
     * Request to set the spotify repeat mode
     */
    async putSetRepeatModeRequest(state: 'track' | 'context' | 'off') {
        try {
            const { data } = await axios.put(`https://api.spotify.com/v1/me/player/repeat?state=${state}`)
            return data
        }
        catch (e) {
            console.log(e)
        }
    },
    
    /**
     * Request to get the current spotify player playback state
     */
    async getPlaybackStateRequest() {
        try{
            const { data } = await axios.get<PlaybackStateType | undefined>('https://api.spotify.com/v1/me/player')
            return data
        }
        catch (e) {
            console.log(e)
        }
    },
    
    /**
     * Request to get Spotify tracks recommendations, given a list of seed track IDs
     * Need to also provide the number of results to return
     */
    async getOneRecommendation(seed_track_ids: string[]) {
        const results_limit = 1
        const seed_tracks_formatted = seed_track_ids.join(',')
        const seeds = `seed_tracks=${seed_tracks_formatted}`
        const limit = `limit=${results_limit}`
    
        const { data } = await axios.get<{tracks: TrackType[]}>(`https://api.spotify.com/v1/recommendations?${seeds}&${limit}`)
        return data.tracks[0]
    },
    
    /**
     * Gets the list of Spotify active devices
     */
    async getSpotifyDevices() {
        try {
            const { data } = await axios.get<{ devices: SpotifyDeviceType[] }>('https://api.spotify.com/v1/me/player/devices')
            return data
        }
        catch(e) {
            console.log(e)
        }
    },

}