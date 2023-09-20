import axios, { AxiosStatic } from "axios";
import { response } from "express";
import { FetchTokenResponse } from "../_types/spotify-api";
import { TokenModel } from "../models";

/**
 * Takes an Axios object and returns with a response interceptor.
 * The interceptor refreshes the Spotify token when it expires 
 * @param axios 
 * @returns axios
 */
function createAxiosResponseInterceptor(axios: AxiosStatic) {
    const interceptor = axios.interceptors.response.use(
        /**
         * First callback handles sucessfull responses.
         * Just returns the response
         * @param response 
         * @returns 
         */
        async response => {
            return response
        },
        /**
         * Second callback handles error responses.
         * If the error is 401 Unauthorized, refreshes the access token.
         * Returns the error otherwise
         * @param error 
         * @returns 
         */
        async error => {
            if (error.response.status !== 401) {
                return Promise.reject(error)
            }
            
            if (!TokenModel.REFRESH_TOKEN) {
                return Promise.reject({message: 'No refresh token provided, 401 Unauthorized Error (did you login to Spotify ?)', error})
            }
            
            /**
             * Eject the Axios interceptor before fetching the new token.
             * Prevents the interceptor to loop on the refresh token api call.
             * The interceptor is reatached after the request to refresh the token
             */
            axios.interceptors.response.eject(interceptor)

            const reqBody = new URLSearchParams()
            reqBody.append('grant_type', 'refresh_token')
            reqBody.append('refresh_token', TokenModel.REFRESH_TOKEN)

            try {
                const { data } =  await axios.post<FetchTokenResponse>("https://accounts.spotify.com/api/token", reqBody, {
                    headers: {
                        'Authorization': `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`
                    }
                })

                //reset apiCredentials
                TokenModel.setCredentials(data)

                // Set the new token for Axios requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`

                // Re-send the original request with the new token
                error.response.config.headers["Authorization"] = `Bearer ${data.access_token}`
                return axios(error.response.config)
            }

            catch (e) {
                return Promise.reject(e);
            }

            finally {
                try {
                    createAxiosResponseInterceptor(axios)
                } catch(error) {
                     response.status(401).send(`Error while fetching token in axiosResponsInterceptor\n${error}`)
                }
            }
        }
    )
    return axios
}

export default createAxiosResponseInterceptor(axios)