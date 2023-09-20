import { ThumbDown } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"

export function MusicCover ({ src }: { src: string }) {
    return (
        <img 
            src={src}
            style={{
                maxWidth: '300px',
                marginTop: '1em',
                minHeight: '300px'
            }} 
        />
    )
}

export function SkipTrackButton ({ onClick, requestedNext, requestsToSkip }: 
    { onClick: () => void, requestedNext: number, requestsToSkip: number }
) {
    return (
        <Button onClick={onClick}>
            <ThumbDown style={{ marginRight: '0.5em'}}/>
            <Typography>{ requestedNext } / { requestsToSkip }</Typography>
        </Button>
    )
}
