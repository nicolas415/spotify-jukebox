import { FetchTokenResponse } from "../_types/spotify-api"

/**
 * The model holding the authentication tokens data.
 */
export class TokenModelClass {
    ACCESS_TOKEN = ''
    REFRESH_TOKEN = ''
    EXPIRES_IN = 0
    SCOPE = ''
    TYPE = ''

    setCredentials(credentials: FetchTokenResponse) {
        const { access_token, expires_in, token_type, scope, refresh_token } = credentials || {}
        this.ACCESS_TOKEN = access_token
        this.EXPIRES_IN = expires_in
        this.TYPE = token_type
        this.SCOPE = scope

        if (refresh_token && typeof refresh_token === 'string') {
            this.REFRESH_TOKEN = refresh_token
        }
    }
}