import { Request, Response } from "express";
import { SpotifyApi as SpotifyApi_ } from "../spotify-api";
import { dataService } from "../services";

/**
 * Controller to search for a track or artist
 * Pass search query in a `searchQuery` key, in the body of the request
 */
export function buildSpotifySearch({ Data, SpotifyApi }: 
    { Data: typeof dataService, SpotifyApi: typeof SpotifyApi_ }
) {
    return async (req: Request, res: Response) => {
        const { search_query } = req.body

        try {
            if (!search_query || typeof search_query !== 'string') {
                throw new Error('No search query provided')
            }

            const { tracks } = await SpotifyApi.getSearchRequest({ search_query, type: 'track', limit: 10 }) || {}
            
            if (tracks) {
                Data.saveTracks(tracks.items)
            }

            res.send({ tracks })
        } catch (e: any) {
            res.status(500)
        }
    }
}
