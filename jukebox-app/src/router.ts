import express from "express";
import {
    authenticationControllers,
    authorizationControllers,
    playbackControllers,
    spotifyControllers
} from "./controllers";

// api router setup
const AppRouter = express.Router()

// get routes
AppRouter.get('/check-app-authorized', authorizationControllers.isAppAuthorized)
AppRouter.get('/spotify-login-uri', authorizationControllers.getSpotifyLoginURI)
AppRouter.get('/callback', authorizationControllers.getSpotifyAuthCallback)
AppRouter.get('/check-user-registered', authenticationControllers.isUserRegistered)

// post routes
AppRouter.post('/register', authenticationControllers.postRegister)
AppRouter.post('/search', spotifyControllers.spotifySearch)

// put routes
AppRouter.put('/pause', playbackControllers.pauseTrack)
AppRouter.put('/play', playbackControllers.playTrack)
AppRouter.put('/next', playbackControllers.skipTrack)

export { AppRouter }