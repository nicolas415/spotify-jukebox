// import { Socket, Server as SocketIoServer } from "socket.io";
import { Socket } from "socket.io";
import { dataService, playbackService } from "../services";
import { SpotifyApi as SpotifyApi_ } from "../spotify-api";
import { websocketServer } from "../websocket";

export class SpotifyPolling {
    pollingInterval: NodeJS.Timeout | null = null
    pollingFrequency = 1000
    Playback: typeof playbackService
    Data: typeof dataService
    SpotifyApi: typeof SpotifyApi_
    Websocket: typeof websocketServer

    constructor({ Playback, Data, spotifyApi, Websocket }: { 
        Playback: typeof playbackService,
        Data: typeof dataService,
        spotifyApi: typeof SpotifyApi_,
        Websocket: typeof websocketServer 
    }) {
        this.Playback = Playback
        this.Data = Data
        this.SpotifyApi = spotifyApi
        this.Websocket = Websocket
    }

    start() {
        const connect = this.connect.bind(this)
        this.Websocket.io?.on('connection', connect)

        const polling = this.polling.bind(this)
        setInterval(polling, this.pollingFrequency)
    }

    connect(socket: Socket) {
        const queue = this.Playback.getUsersQueue()
        const enhancedQueue = this.Data.enhanceQueue(queue)
        const users = this.Data.getUsers()
        
        socket.emit('users_queue_snapshot', enhancedQueue)
        socket.emit('users_list_snapshot', users)
    }

    async polling() {
        try {
            const currentState = await this.SpotifyApi.getPlaybackStateRequest()

            // if no current state, return
            if (!currentState?.item) {
                return
            }

            if (!this.Data.getHistory().length) {
                this.Data.saveHistory(currentState.item.id)
            }
        
            // sets repeat mode to off
            if (currentState.repeat_state !== 'off') {
                await this.SpotifyApi.putSetRepeatModeRequest('off')
            }

            // if track ended
            if (!currentState.is_playing && currentState.progress_ms === 0) {
                try { 
                    await this.Playback.playNextTrack()

                    const queue = this.Playback.getUsersQueue()
                    const enhancedQueue = this.Data.enhanceQueue(queue)

                    this.Websocket.io?.emit('users_queue_update', enhancedQueue)
                }
                catch(e) {
                    console.log(e)
                }
            }

            this.Websocket.io?.emit('playback-state', currentState)

        } catch (error) {
            console.log(error)
        }
    }
}