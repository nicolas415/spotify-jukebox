import test from 'ava'
import request from 'supertest'
import { buildPauseTrack } from '../_playback'
import app from '../../app'

test('call to `/pause` endpoint triggers request to pause track, and sends 200 response', async t => {
    let calledPauseTrack = false
    const pauseTrackMock: any = { putPauseRequest: async () => { calledPauseTrack = true }}
    const pauseTrack = buildPauseTrack({ SpotifyApi: pauseTrackMock })
    app.put('/pause', pauseTrack)

    const response = await request(app).put('/pause')
    t.true(calledPauseTrack)
    t.is(response.status, 200)
})

