import { Server as SocketIoServer, ServerOptions } from "socket.io";
import { Server as HttpServer } from "http";

export class WebsocketServer {
    io: SocketIoServer | null = null
    serverOptions: Partial<ServerOptions> = process.env.PROD ? {} : {
        cors: {
            origin: process.env.CLIENT_APP_URI,
            methods: ['GET', 'POST'],
        }
    }

    init({ httpServer }: { httpServer: HttpServer }) {
        this.io = new SocketIoServer(httpServer, this.serverOptions)
    }
}
