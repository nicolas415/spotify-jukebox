import { TrackType } from "./spotify-api"

/**
 * The User object format
 */
export type UserType = {
    color: string,
    number: number,
    username: string
}

export type MusicHistoryType = {
    track_id: string,
    count: number
}

/**
 * The Track object format, when stored in the users queue
 */
export type QueuedTrackType = {
    track: TrackType, 
    user: UserType
}