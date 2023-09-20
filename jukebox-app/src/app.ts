import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express()
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public')) // makes the /public folder reachable via HTTP (to serve client app)
app.use(cors({ origin: process.env.CLIENT_APP_URI, credentials: true }))
app.use(cookieParser())

export default app
