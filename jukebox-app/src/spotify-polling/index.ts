import { dataService, playbackService } from "../services";
import { SpotifyApi } from "../spotify-api";
import { websocketServer } from "../websocket";
import { SpotifyPolling } from "./_spotify-polling";

export const spotifyPolling = new SpotifyPolling({
    Playback: playbackService,
    Data: dataService,
    spotifyApi: SpotifyApi,
    Websocket: websocketServer
})