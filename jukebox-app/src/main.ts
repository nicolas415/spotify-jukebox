import * as dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
dotenvExpand.expand(dotenv.config())

import { createServer } from 'http'
import app from './app'
import { websocketServer } from "./websocket";
import { AppRouter } from './router';

// attach router to app, under the `/api` route
app.use('/api', AppRouter)
// prevent production app from error on page refresh
app.get('/app', (req, res) => {
    if (process.env.CLIENT_APP_URI) {
        res.redirect(process.env.CLIENT_APP_URI)
    }
})

const server = createServer(app)
websocketServer.init({ httpServer: server })

server.listen(process.env.APP_PORT, () => {
    if (process.env.PROD) {
        console.log('app running on :', process.env.CLIENT_APP_URI)
    }
    else {
        console.log('server running on :', `http://${process.env.CLIENT_HOSTNAME}:${process.env.APP_PORT}`)
    }
})
