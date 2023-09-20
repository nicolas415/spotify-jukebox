import { HistoryModel, TracksModel, UsersModel } from "../models";
import { TrackType } from "../_types/spotify-api";

export class DataService {
    Tracks: typeof TracksModel
    Users: typeof UsersModel
    History: typeof HistoryModel

    constructor({ Tracks, Users, History }: 
        {Tracks: typeof TracksModel, Users: typeof UsersModel, History: typeof HistoryModel}
    ) {
        this.Tracks = Tracks
        this.Users = Users
        this.History = History
    }

    getTrack(track_id: string) {
        return this.Tracks.get(track_id)
    }

    saveTrack(track: TrackType) {
        this.Tracks.save(track)
    }

    saveTracks(tracks: TrackType[]) {
        this.Tracks.save(tracks)
    }

    getUser(username: string) {
        return this.Users.get(username)
    }

    getUsers() {
        return this.Users.getUsers()
    }

    getUsersCount() {
        return this.Users.users_count
    }

    saveUser(username: string, user_color: string) {
        this.Users.save(username, user_color)
    }

    isUserRegistered(username: string) {
        return this.Users.isUserRegistered(username)
    }

    saveHistory(track_id: string) {
        this.History.save(track_id)
    }

    getHistory() {
        return this.History.getHistory()
    }

    getLastHistory() {
        const lastElementIndex = this.History.getHistory().length - 1
        return this.History.getHistory()[lastElementIndex]
    }

    enhanceQueue(queue: { trackId: string, username: string }[]) {
        const enhancedQueue = queue.map(queueTrack => {
            return {
                track: this.Tracks.get(queueTrack.trackId),
                user: this.Users.get(queueTrack.username)
            }
        })

        return enhancedQueue
    }
}