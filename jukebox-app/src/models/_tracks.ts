import { TrackType } from "../_types/spotify-api"

/**
 * The model that stores the tracks data.
 * When some data for a track is retrive from Spotify, it is stored here.
 * 
 * TracksModel is then used to get informations about a track, from a given id.
 */
export class TracksModelClass {
    data: { [track_id: string]: TrackType } = {}
    count = 0

    save(tracks: TrackType | TrackType[]) {
        if (!Array.isArray(tracks)) {
            tracks = [tracks]
        }

        if (this.count > 100000) {
            console.log('TOO MUCH MEMORY ALLOCATED FOR THE TRACKS INDEX /!\\')
        }

        tracks.forEach(track => {
            if (!this.data[track.id]) {
                this.data[track.id] = track
                this.count++
            } 
        })
    }

    get(track_ids: string) {
        return this.data[track_ids]
    }
}