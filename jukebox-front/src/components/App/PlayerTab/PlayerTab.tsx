import { Box, Typography, LinearProgress } from '@mui/material';
import { ArtistsDisplay } from '../../Common/Artists';
import { PlaybackStateType, UserListType } from '../../../hooks/Socket.io/types';
import { nextTrack } from '../../../requests';
import { MusicCover, SkipTrackButton } from './PlayerTab.ui';

export default function PlayerTab ({ playbackState, progressPercent, durationsFormated, nextReqs, users }: 
	{ playbackState?: PlaybackStateType, progressPercent: number, durationsFormated: { progress: string; total: string; }, nextReqs?: unknown[], users?: UserListType }
) {
	const PERCENTAGE_TO_SKIP = 0.3

	return (
		<Box display='flex' flexDirection='column' sx={{ width: '100%', height: 'calc(100vh - 5em)', overflowY: 'hidden' }}>
			{ !playbackState?.item ? null : 
				<Box sx={{ width: '100%', mb: '2em' }}>
					<Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
						<MusicCover src={playbackState.item.album.images[0].url} />
						<LinearProgress variant='determinate' value={progressPercent} style={{ width: '300px', marginBottom: '0.5em' }} />
						<SkipTrackButton 
							onClick={async () => await nextTrack()} 
							requestedNext={nextReqs?.length || 0} 
							requestsToSkip={users ? Math.ceil(Object.keys(users).length * PERCENTAGE_TO_SKIP) : 1} 
						/>
						{/* TRACK PROGRESS INFOS */}
						<Box sx={{width: '300px', display: 'flex', justifyContent: 'space-between', marginBottom: '1em'}}>
							<Typography color='primary'>{durationsFormated.progress}</Typography>
							<Typography color='lightgrey'>{durationsFormated.total}</Typography>
						</Box>
						<ArtistsDisplay style={{ color: 'lightgrey', width: '300px' }} artists={ playbackState.item.artists } />
						{/* TRACK NAME */}
						<Typography width='300px' color='white' fontSize='1.25em'>{ playbackState.item.name }</Typography>
					</Box>
				</Box>
			}
		</Box>
	)
}