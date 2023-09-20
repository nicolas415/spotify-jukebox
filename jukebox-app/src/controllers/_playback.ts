import { Request, Response } from "express";
import { dataService, playbackService } from "../services";
import { SpotifyApi, SpotifyApi as SpotifyApi_ } from "../spotify-api";
import { websocketServer } from "../websocket";


/**
 * 
 * Pause the current playing track
 */
export function buildPauseTrack({ SpotifyApi }: { SpotifyApi: typeof SpotifyApi_ }) {
    return async function (req: Request, res: Response) {
        try {
            await SpotifyApi.putPauseRequest()
            res.send('track paused')
        } catch (e) {
            console.log(e)
            res.status(500).send('Server Error')
        }
    }
}

/**
 * 
 * Handles the requests to play a track, the `track_id` is provided in the request body
 */
export function buildPlayTrack({ Playback, Data, SpotifyApi, Websocket }: {
    Playback: typeof playbackService,
    Data: typeof dataService,
    SpotifyApi: typeof SpotifyApi_,
    Websocket:  typeof websocketServer
}) {
    return async function (req: Request, res: Response) {
        const { track_id } = req.body || {}
        const track = Data.getTrack(track_id)
        const username = req.cookies.jb_usr
        
        if (typeof username !== 'string') {
            res.send({ message: 'no username provided', data: null })
            return
        }

        if (Data.isUserRegistered(username) === false) {
            res.send('user not registered')
            return
        }
        
        if (typeof track_id !== 'string' || !track_id) {
            res.send({ message: 'no track id provided', data: null })
            return
        }
        
        if (!track) {
            res.send({ message: 'track not found', data: null })
            return
        }

        // if no user track is playing, directly play the track
        if (Playback.isUserTrackPlaying() === false) {
            try {
                if (!Playback.getDeviceId()) {
                    try {
                        const { devices } = await SpotifyApi.getSpotifyDevices() || {}
                        if (devices?.length) {
                            Playback.setDeviceId(devices[0].id)
                        }
                    }
                    catch (e) {
                        console.log(e)
                    }
                }
                await SpotifyApi.putPlayRequest(track.uri, Playback.getDeviceId())
                Playback.setUserTrackIsPlaying(true)

                Data.saveHistory(track_id)
                Playback.addTrackToUsersQueue(track_id, username)

                const queue = Playback.getUsersQueue()
                const enhancedQueue = Data.enhanceQueue(queue)

                Websocket.io?.emit('users_queue_update', enhancedQueue)
                res.send({ message: 'track played', data: null })
                return
            }
            catch (e) {
                console.log(e)
                res.status(500).send({ message: 'Server Error', data: null })
                return
            }
        }

        // if users track is playing, add track to users queue
        if (Playback.isUserTrackPlaying() === true) {
            const isTrackAlreadyInQueue = Playback.isTrackAlreadyInQueue(track_id)

            if (isTrackAlreadyInQueue) { // track already in queue, do nothing
                res.send({ message: 'track already in queue', data: null, already_in_queue: true })
                return
            }
            else { // track not in queue, add it to queue
                Playback.addTrackToUsersQueue(track_id, username)

                const queue = Playback.getUsersQueue()
                const enhancedQueue = Data.enhanceQueue(queue)

                // send the updated queue to all users
                Websocket.io?.emit('users_queue_update', enhancedQueue)
                res.send({ message: 'track added to queue', data: null })
            }
        }
    }
}

/**
 * Called when a user requests to skip the current playing track
 */
export function buildSkipTrack({ Data, Playback, Websocket }: {
    Data: typeof dataService,
    Playback: typeof playbackService,
    Websocket: typeof websocketServer
}) {
    return async (req: Request, res: Response) => {
        const username = req.cookies?.jb_usr

        if (!Data.isUserRegistered(username)) {
            res.send('no username')
            return
        }

        if (Playback.userAlreadyRequestedToSkipTrack(username)) {
            res.send('next already requested')
            return
        }

        Playback.addNextTrackRequest(username)

        const usersCount = Data.getUsersCount()
        const shouldPlayNextTrack = Playback.shouldPlayNextTrack(usersCount)

        if (shouldPlayNextTrack === false) {
            const userRequestingNextTrack = Playback.getUsersRequestingNextTrack()
            websocketServer.io?.emit('next_requested', userRequestingNextTrack)
            res.send('next request done')
            return
        }
        
        Playback.resetNextRequests()

        await Playback.playNextTrack()
        
        const queue = Playback.getUsersQueue()
        const enhancedQueue = Data.enhanceQueue(queue)
        
        Websocket.io?.emit('users_queue_update', enhancedQueue)
        Websocket.io?.emit('next_requested', [])
        res.send('track nexted')
    }
}



