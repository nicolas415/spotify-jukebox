import { PlaybackService } from "./_playback-service";
import { DataService } from "./_data-service";

import { playlistEntity, usersEntity } from "../entities"

import { HistoryModel, TokenModel, TracksModel, UsersModel } from "../models";
import { RegisterService } from "./_register-service";
import { SpotifyAuthService } from "./_spotify-auth-service";
import { SpotifyApi } from "../spotify-api";



export const dataService = new DataService({
    Tracks: TracksModel,
    Users: UsersModel,
    History: HistoryModel
})

export const playbackService = new PlaybackService({
    Playlist: playlistEntity,
    SpotifyApi: SpotifyApi,
    Data: dataService
})

export const registerService = new RegisterService({
    UsersModel: UsersModel,
    UsersEntity: usersEntity
})

export const spotifyAuthService = new SpotifyAuthService({
    Token: TokenModel,
    SpotifyApi: SpotifyApi,
})
