export type PlaybackStateType = {
    device: {
        id: string,
        is_active: boolean,
        is_private_session: boolean,
        is_restricted: boolean,
        name: string,
        type: string,
        volume_percent: number,
    },
    repeat_state: string,
    shuffle_state: string,
    context: {
        type: string,
        href: string,
        external_urls: {
            spotify: string
        },
        uri: string
    },
    timestamp: number,
    progress_ms: number,
    is_playing: boolean,
    item: TrackType,
}

export type TrackType = {
    album: AlbumType,
    artists: ArtistType[],
    available_markets: string[],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_ids: {
        isrc: string,
    },
    external_urls: {
        spotify: string,
    },
    href: string,
    id: string,
    is_local: boolean,
    name: string,
    popularity: number,
    preview_url: string,
    track_number: number,
    type: string,
    uri: string
}

export type AlbumType = {
    album_type: string,
    artists: ArtistType[],
    available_markets: string[],
    external_urls: {
        spotify: string,
    },
    href: string,
    id: string,
    images: SpotifyImageType[],
    name: string,
    release_date: string,
    release_date_precision: string,
    total_tracks: number,
    type: string,
    uri: string

}

export type ArtistType = {
    external_urls: {
        spotify: string,
    },
    href: string,
    id: string,
    name: string,
    type: string,
    uri: string
}

export type SpotifyImageType = {
    height: number,
    width: number,
    url: string
}

export type UserListType = {
    [username: string]: {
        color: string,
        number: number,
    }
}

export type MusicQueue = { 
    track: TrackType, 
    user: { 
        color: string, 
        number: number, 
        username: string, 
    }
}[]