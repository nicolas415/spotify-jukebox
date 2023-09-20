import test from 'ava'
import { PlaybackService } from '../_playback-service'

test('skip user track, using `playNextTrack` method', async t => {
    let trackPlayTriggered = false
    let trackUriPlayed = ''

    const SpotifyApi = { 
        putPlayRequest: (trackUri: string, deviceId: string) => {
            if (trackUri && deviceId) {
                trackUriPlayed = trackUri
                trackPlayTriggered = true 
            }
        },
        
        getOneRecommendation() {
            return {
                id: '3',
                uri: 'track-3-uri'
            }
        }
    } as any

    const Playlist = {
        getDeviceId: () => 'deviceId',
        user_track_is_playing: true,
        users_queue: [{ trackId: '1', username: 'user1' }, { trackId: '2', username: 'user2' }],
        refreshAutomaticTrack() {},
    } as any

    const Data = {
        getTrack: (trackId: string) => ({ uri: `track-${trackId}-uri` }),
        getLastHistory() { return { track_id: '2' } },
        saveTrack() {},
        saveHistory() {},
    } as any

    const playbackService = new PlaybackService({
        Playlist,
        SpotifyApi,
        Data
    })

    await playbackService.playNextTrack()

    t.is(playbackService.getUsersQueueLength(), 1)
    t.true(trackPlayTriggered)
    t.is(trackUriPlayed ,'track-2-uri')
    t.true(playbackService.isUserTrackPlaying())
})

test('skip spotify recommendation track, using `playNextTrack` method', async t => {
    let trackPlayTriggered = false
    let trackUriPlayed = ''

    const SpotifyApi = { 
        putPlayRequest: (trackUri: string, deviceId: string) => {
            if (trackUri && deviceId) {
                trackUriPlayed = trackUri
                trackPlayTriggered = true 
            }
        },
        
        getOneRecommendation() {
            return {
                id: '3',
                uri: 'track-3-uri'
            }
        }
    } as any

    const Playlist = {
        getDeviceId: () => 'deviceId',
        user_track_is_playing: true,
        users_queue: [{ trackId: '1', username: 'user1' }],
        refreshAutomaticTrack() {},
    } as any

    const Data = {
        getLastHistory() { return { track_id: '2' } },
        saveTrack() {},
        saveHistory() {},
    } as any

    const playbackService = new PlaybackService({
        Playlist,
        SpotifyApi,
        Data
    })

    await playbackService.playNextTrack()

    t.true(trackPlayTriggered)
    t.is(trackUriPlayed ,'track-3-uri')
    t.false(playbackService.isUserTrackPlaying())
})
