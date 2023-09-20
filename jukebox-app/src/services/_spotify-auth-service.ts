
import { TokenModel } from "../models";
import { FetchTokenResponse } from "../_types/spotify-api";
import { SpotifyApi as SpotifyApi_ } from "../spotify-api";

export class SpotifyAuthService {
    Token: typeof TokenModel
    SpotifyApi: typeof SpotifyApi_

    constructor({ Token, SpotifyApi }: 
        { Token: typeof TokenModel, SpotifyApi: typeof SpotifyApi_ }
    ) {
        this.Token = Token
        this.SpotifyApi = SpotifyApi
    }

    async setCredentials(credentials: FetchTokenResponse ) {
        // set access token on every axios request
        this.SpotifyApi.axios.defaults.headers.common['Authorization'] = `Bearer ${credentials.access_token}`
        TokenModel.setCredentials(credentials)
    }

    isAppAuthorized() {
        if (this.Token.REFRESH_TOKEN) {
            return true
        } else {
            return false
        }
    }
    
    _getCredentialsRequestParams(authCode: string) {
        const { REDIRECT_URI, CLIENT_ID, CLIENT_SECRET } = process.env
    
        if (!REDIRECT_URI || !CLIENT_ID || !CLIENT_SECRET) {
            throw new Error('Either `REDIRECT_URI`, `CLIENT_SECRET` or `CLIENT_ID` missing ing .env')
        }
    
        const authBody = new URLSearchParams()
        authBody.append('grant_type', 'authorization_code')
        authBody.append('code', authCode.toString())
        authBody.append('redirect_uri', REDIRECT_URI)
        
        const authString = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
    
        return { authBody, authString }
    }


}