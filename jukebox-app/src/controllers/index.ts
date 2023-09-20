/* THE APP CONTROLLERS */
import { buildPauseTrack, buildPlayTrack, buildSkipTrack } from './_playback'
import { SpotifyApi } from '../spotify-api'
import { websocketServer } from '../websocket'
import { dataService, playbackService, registerService, spotifyAuthService } from '../services'
import { buildIsUserRegistered, buildPostRegister } from './_authentication'
import { buildGetSpotifyAuthCallback, buildGetSpotifyLoginURI, buildIsAppAuthorized } from './_authorization'
import { buildSpotifySearch } from './_search'
import { spotifyPolling } from '../spotify-polling'

/**
 * Authentication controllers
 */
export const postRegister = buildPostRegister({
    Data: dataService,
    Register: registerService,
    Websocket: websocketServer,
})
export const isUserRegistered = buildIsUserRegistered({ 
    Data: dataService 
})

/**
 * Authorization controllers
 */
export const getSpotifyLoginURI = buildGetSpotifyLoginURI()
export const getSpotifyAuthCallback = buildGetSpotifyAuthCallback({
    SpotifyApi: SpotifyApi,
    AuthService: spotifyAuthService,
    SpotifyPolling: spotifyPolling
})
export const isAppAuthorized = buildIsAppAuthorized({
    SpotifyAuthService: spotifyAuthService,
})

/**
 * Playback controllers
 */
export const pauseTrack = buildPauseTrack({
    SpotifyApi: SpotifyApi
})
export const playTrack = buildPlayTrack({
    Playback: playbackService,
    Data: dataService,
    SpotifyApi: SpotifyApi,
    Websocket: websocketServer
})
export const skipTrack = buildSkipTrack({
    Data: dataService,
    Playback: playbackService,
    Websocket: websocketServer
})

/**
 * Spotify search controllers
 */
export const spotifySearch = buildSpotifySearch({
    Data: dataService,
    SpotifyApi: SpotifyApi
})

export const authenticationControllers = { postRegister, isUserRegistered }
export const authorizationControllers = { getSpotifyAuthCallback, getSpotifyLoginURI, isAppAuthorized }
export const playbackControllers = { pauseTrack, playTrack, skipTrack }
export const spotifyControllers = { spotifySearch }
