import { dataService } from "."
import { playlistEntity } from "../entities"
import { SpotifyApi as SpotifyApi_ } from '../spotify-api'

export class PlaybackService {
    Playlist: typeof playlistEntity
    SpotifyApi: typeof SpotifyApi_
    Data: typeof dataService
    
    constructor({ Playlist, SpotifyApi, Data }: {
        Playlist: typeof playlistEntity, SpotifyApi: typeof SpotifyApi_, Data: typeof dataService 
    }) {
        this.Playlist = Playlist
        this.SpotifyApi = SpotifyApi
        this.Data = Data
    }

    setUserTrackIsPlaying(isPlaying: boolean) {
        this.Playlist.user_track_is_playing = isPlaying
    }

    isUserTrackPlaying() {
        return this.Playlist.user_track_is_playing
    }

    addTrackToUsersQueue(trackId: string, username: string) {
        this.Playlist.users_queue.push({ trackId: trackId, username })
    }

    getUsersQueue() {
        return this.Playlist.users_queue
    }

    getFirstTrackFromUsersQueue() {
        return this.Playlist.users_queue[0]
    }

    getUsersQueueLength() {
        return this.Playlist.users_queue.length
    }

    isTrackAlreadyInQueue(trackId: string) {
        return this.Playlist.users_queue.some(track => track.trackId === trackId)
    }

    removeCurrentTrackFromUsersQueue() {
        this.Playlist.users_queue.shift()
    }

    userAlreadyRequestedToSkipTrack(username: string) {
        return this.Playlist.hasUserRequestedNextTrack(username)
    }

    addNextTrackRequest(username: string) {
        this.Playlist.addUserToNextTrackRequest(username)
    }

    getUsersRequestingNextTrack() {
        return this.Playlist.users_requested_next
    }

    resetNextRequests() {
        this.Playlist.users_requested_next = []
    }

    shouldPlayNextTrack(usersCount: number) {
        return this.Playlist.shouldPlayNextTrack(usersCount)
    }

    refreshAutomaticTrack(trackId: string) {
        this.Playlist.refreshAutomaticTrack([trackId])
    }

    getDeviceId() {
        return this.Playlist.getDeviceId()
    }

    setDeviceId(deviceId: string) {
        this.Playlist.setDeviceId(deviceId)
    }

    async playNextTrack() {
        if (this.getUsersQueueLength() > 1) {

            this.removeCurrentTrackFromUsersQueue()
            await this.playTrackFromUsersQueue()

        }
        else {

            if (this.getUsersQueueLength() === 1) {
                this.removeCurrentTrackFromUsersQueue()
            }

            await this.playTrackFromRecommendations()

        }
    }

    async playTrackFromUsersQueue() {
        const nextTrack = this.getFirstTrackFromUsersQueue()
        const track = this.Data.getTrack(nextTrack.trackId)

        await this.SpotifyApi.putPlayRequest(track.uri, this.getDeviceId())
        this.setUserTrackIsPlaying(true)
    }

    async playTrackFromRecommendations() {
        const lastHistory = this.Data.getLastHistory()
        const recommandation = await this.SpotifyApi.getOneRecommendation([lastHistory.track_id])
        this.Data.saveTrack(recommandation)
        this.Data.saveHistory(recommandation.id)
        this.refreshAutomaticTrack(recommandation.id)
      
        await this.SpotifyApi.putPlayRequest(recommandation.uri, this.getDeviceId())
        this.setUserTrackIsPlaying(false)
    }
}
