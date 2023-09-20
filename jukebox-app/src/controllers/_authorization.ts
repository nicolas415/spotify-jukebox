import { Request, Response } from "express";
import querystring from 'querystring'
import { spotifyAuthService } from "../services";
import { SpotifyApi as SpotifyApi_ } from "../spotify-api";
import { spotifyPolling as spotifyPolling_ } from "../spotify-polling";

/**
 * Login to spotify, to get a refresh token
 */
export function buildGetSpotifyLoginURI() {
    return (req: Request, res: Response<{spotifyLoginURI: string}>) => {
        const scope = [
            'user-read-private',
            'user-read-email',
            'user-modify-playback-state',
            'user-read-playback-state',
        ]

        const state = _generateRandomString(16)
        const spotifyAuthRoute = 'https://accounts.spotify.com/authorize'
        const spotifyAuthQueryParams = querystring.stringify({
            response_type: 'code',
            client_id: process.env.CLIENT_ID,
            scope: scope.join(' '),
            redirect_uri: process.env.REDIRECT_URI,
            state: state
        })

        res.send({ spotifyLoginURI: `${spotifyAuthRoute}?${spotifyAuthQueryParams}`});
    }
}

/**
 * The controller Spotify authorization redirects to, with the code to generate an access_token
 * 
 * Queries access_token & refresh_token to the Spotify API
 * 
 * access_token is defined as axios default Authorization header
 * 
 * refresh_token is set in the global `TOKEN.conf` variable
 * 
 * Other data received from Spotify are set in `TOKEN.config`
 */
export function buildGetSpotifyAuthCallback ({ SpotifyApi, AuthService, SpotifyPolling }: 
    { SpotifyApi: typeof SpotifyApi_, AuthService: typeof spotifyAuthService, SpotifyPolling: typeof spotifyPolling_}
) {
    return async (req: Request, res: Response) => {
        const { code, state, error } = req.query
        
        if (error) {
            console.log('Authentication Error :', error)
            return
        }
        
        if (!code || !state) {
            console.log('Authentication Error : !code || !state returned to /callback')
            return
        }

        const { authBody, authString } = AuthService._getCredentialsRequestParams(code.toString())
        const credentials = await SpotifyApi.postCredentialsRequest(authBody, authString)

        if (!process.env.CLIENT_APP_URI || !credentials) {
            throw new Error('Authentication Error : client side URI or credentials not provided')
        }

        AuthService.setCredentials(credentials)
        SpotifyPolling.start()
        res.redirect(process.env.CLIENT_APP_URI)
    }
}

/**
 *  Returns the app authorization state, by checking if a refresh token has been saved
 */
export function buildIsAppAuthorized({ SpotifyAuthService }: { SpotifyAuthService: typeof spotifyAuthService }) {
    return (req: Request, res: Response) => {
        if (SpotifyAuthService.isAppAuthorized()) {
            res.send({ authorized: true })
        } else {
            res.send({ authorized: false })
        }
    }
}

/**
 * Generates a random string containing numbers and letters
 */
function _generateRandomString(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};