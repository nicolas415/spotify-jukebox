import { useEffect, useState } from "react"
import { PlaybackStateType } from "./Socket.io/types"
import { formatDuration } from "../utils"

/**
 * Returns the percentage of the track progress bar and the formatted time,
 * given the current playback state
 */
export function useFormatPlaybackState(playbackState?: PlaybackStateType) {
    const [progressPercent, setProgressPercent] = useState(0)
    const [durationsFormated, setDurationsFormated] = useState({ progress: '', total: '' })

    /**
     * Sets the percentage of the track progress bar
     */
    useEffect(() => {
        if (playbackState) {
            const { progress_ms, item } = playbackState
            
            if (!progress_ms) {
                setProgressPercent(0)
                return
            }
    
            const _progressPercent = (progress_ms / item.duration_ms) * 100
            setProgressPercent(_progressPercent)
        }
    },[playbackState?.progress_ms])
    
    /**
     * Formats time from milliseconds to 'minutes:seconds'
     */
    useEffect(() => {
        if (typeof playbackState?.progress_ms === 'number') {
            setDurationsFormated(prevState => ({ ...prevState, progress: formatDuration(playbackState.progress_ms)}))
        }
    
        if (typeof playbackState?.item?.duration_ms === 'number') {
            setDurationsFormated(prevState => ({ ...prevState, total: formatDuration(playbackState.item.duration_ms)}))
        }
    },[playbackState?.progress_ms])

    return { progressPercent, durationsFormated }
}
