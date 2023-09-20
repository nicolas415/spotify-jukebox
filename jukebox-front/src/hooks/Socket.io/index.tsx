import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { socket } from "./SocketSingleton";

/**
 * The context holding the socket.io socket (for message emitting),
 * 
 * The context also holds properties set by the socket.io server
 */
export const SocketIOContext = createContext<{ client: Socket | null, connected: boolean}>({ client: null, connected: false })

export function SocketIOProvider({ children }: { children: React.ReactNode }) {
    const firstRender = useRef(true)
    const [socketState, setSocketState] = useState<{ client: Socket | null, connected: boolean}>({ client: null, connected: false })

	useEffect(() => {
		if (firstRender.current) {
            firstRender.current = false
            socket.init()

            if (socket.client) {
                setSocketState({ connected: socket.connected, client: socket.client })
            }
		}
    }, [])

			// socketClient.on('playback-state', (playbackState: PlaybackStateType) => setSocket(prevSocket => { return { ...prevSocket, playbackState: playbackState }}))
			// socketClient.on('auto_queue_snapshot', (tracks: TrackType[]) => setAutoQueue(tracks))
			// socketClient.on('auto_queue_update', (tracks: TrackType[]) => setAutoQueue(tracks))

    return (
        <SocketIOContext.Provider value={socketState}>
            { children }
        </SocketIOContext.Provider>
    )
}

export function useSocketEvent<T>(eventNames: string | string []) {
    const socket = useContext(SocketIOContext)
    const [socketState, setSocketState] = useState<T>()
    
    useEffect(() => {
        if (socket.client) {
            const callback = (socketData: T) => setSocketState(socketData)
            if (!Array.isArray(eventNames)) eventNames = [eventNames]
    
            eventNames.forEach(eventName => {
                socket.client?.on(eventName, callback)
            })
    
            return () => {
                if (!Array.isArray(eventNames)) eventNames = [eventNames]
                
                eventNames.forEach(eventName => {
                    socket.client?.off(eventName, callback)
                })
            }
        }
	}, [socket.client])
    
    return socketState
}