import { TrackItemType } from "../../../../requests/payloadTypes"
import { Box, Button, Typography } from "@mui/material"
import { ArtistsDisplay } from "../../../Common/Artists"

/**
 * 
 * Track item Component to display a track of a search results list
 * 
 * Plays the corresponding track on the Spotify client when clicked
 */
export default function TrackItem ({ item, onClick }: { item: TrackItemType, onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void } ) {

	return (
		<Button onClick={onClick} key={item.id} sx={{
			backgroundColor: 'rgba(255, 255, 255, 0.025)',
			mb: '1em',
			borderRadius: '5px',
			display: 'flex',
			width: '100%',
			justifyContent : 'flex-start'
		}}>
			<img style={{ maxHeight: '50px', padding: '0.5em' }} src={item.album.images[2].url}/>
			<Box display='block' sx={{overflowX: 'hidden', paddingTop: '0.25em', textAlign: 'left'}}>
				<Typography style={{ color: 'white', overflowX: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{ item.name }</Typography>
				<ArtistsDisplay style={{color: 'lightgrey'}} artists={item.artists}/>
			</Box>
		</Button>
	)
}