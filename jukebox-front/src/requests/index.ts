import axios from "axios";
import { getErrorMessage } from "../utils";
import { spotifyTracksQueryResponse } from "./payloadTypes";
const isProduction = import.meta.env.PROD

if (isProduction) {
    axios.defaults.baseURL = `${window.location.origin}/api`
} else {
    axios.defaults.baseURL = `http://${window.location.hostname}:3000/api`
}

/**
 * Checks if app has been authorized with a Spotify login
 */
export async function checkAppAuthorized(): Promise<{ authorized: boolean }> {
    try {
        const { data } = await axios.get('/check-app-authorized')
        return data
    } catch(e) {
        const errorMessage = getErrorMessage(e)
        throw new Error(errorMessage)
    }
}

/**
 * Checks is the current user has registered to the app
 */
export async function checkUserRegistered(): Promise<{ registered: boolean }> {
    try {
        const { data } = await axios.get('/check-user-registered', { withCredentials: true })
        return data
    } catch(e) {
        const errorMessage = getErrorMessage(e)
        throw new Error(errorMessage)
    }
}

/**
 * Returns the Spotify login URI, for Spotify authentication
 * 
 * On Spotify authentication sucess, the app is authorized
 */
export async function getSpotifyLoginURI(): Promise<{ spotifyLoginURI: string }> {
    try {
        const { data } = await axios.get('/spotify-login-uri')
        return data
    } catch(e) {
        const errorMessage = getErrorMessage(e)
        throw new Error(errorMessage)
    }
}

export async function registerUser(username: string): Promise<{ registered: boolean, message: string }> {
    try {
        const { data } = await axios.post('/register', { username }, { withCredentials: true })
        return data
    } catch(e) {
        const errorMessage = getErrorMessage(e)
        throw new Error(errorMessage)
    }
}

export async function postSpotifySearch(search_query: string) {
    try {
        const { data } = await axios.post<spotifyTracksQueryResponse>('/search', { search_query })
        return data
    } catch(e) {
        const errorMessage = getErrorMessage(e)
        throw new Error(errorMessage)
    }
}

export async function playSpotifyTrack({ trackId }: { trackId: string }) {
    try {
        const { data } = await axios.put<{ message: string, data: null, already_in_queue?: boolean }>('/play', { track_id: trackId }, {
            withCredentials: true
        })
        return { data }
    } catch(e) {
        const errorMessage = getErrorMessage(e)
        throw new Error(errorMessage)
    }
}

export async function nextTrack() {
    try {
        const { data } = await axios.put<{ message: string, data: null, already_in_queue?: boolean }>('/next', {}, {
            withCredentials: true
        })
        return { data }
    } catch(e) {
        const errorMessage = getErrorMessage(e)
        throw new Error(errorMessage)
    }
}
