import { io, Socket as SocketType } from "socket.io-client"

class SocketClass {
    initialized: boolean = false
    connected: boolean = false
    client: SocketType | null = null

    init() {
        if (!this.initialized) {
            if (import.meta.env.DEV) {
                this.client = io(`http://${window.location.hostname}:3000`)
            } else {
                this.client = io()
            }
            this.initialized = true
            this.client.on('connect', () => this.connected = true)
            this.client.on('disconnect', () => this.connected = false)
        }
    }
}

export const socket = new SocketClass()