/**
 * Spotify response payload for access token request
 */
export interface FetchTokenResponse {
    access_token: string,
    token_type: string, 
    scope : string, 
    expires_in: number, 
    refresh_token?: string
}

/**
 * Spotify generic response payload for a search query, for a given item (track | album | artist)
 */
type _SearchQueryResponseGeneric<T> = {
    href: string,
    items: T[],
    limit: number,
    next: string | null,
    offset: number,
    previous: string | null,
    total: number
}

/**
 * Spotify response payload for a search query
 */
export type SearchQueryResponse<T extends 'track' | 'album' | 'artist'> = {
    tracks: T extends 'track' ? _SearchQueryResponseGeneric<TrackType> : undefined,
    albums: T extends 'album' ? _SearchQueryResponseGeneric<AlbumType> : undefined,
    artists: T extends 'artist' ? _SearchQueryResponseGeneric<ArtistType> : undefined,
}

/**
 * Track type built with the "search API" response
 */
export type Track = {
    id: string,
    name: string,
    artists: Artist[],
    img_url: string,
    album: Album,
    popularity: number,
}

/**
 * Artist type built with the "search API" response
 */
export type Artist = {
    id: string,
    name: string,
    img_url: string,
    tracks: Track[]
    albums: any,
    popularity: number,
}

/**
 * Album type built with the "search API" response
 */
export type Album = {
    id: string,
    name: string,
    artists: Artist[]
    img_url: string,
    tracks: Track[]
    popularity: number,
}

/**
 * Object returned from a Spotify track current state request
 */
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

/**
 * Spotify track type
 */
export type TrackType = {
    album: AlbumType,
    artists: ArtistType[],
    available_markets: string[],
    disc_number: string,
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

/**
 * Spotify album type
 */
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

/**
 * Spotify artist type
 */
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

/**
 * Spotify image type
 */
export type SpotifyImageType = {
    height: number,
    width: number,
    url: string
}

/**
 * Spotify device type
 */
export type SpotifyDeviceType = {
    id: string,
    is_active: boolean,
    is_private_session: boolean,
    is_restricted: boolean,
    name: string,
    type: string,
    volume_percent: number,
}