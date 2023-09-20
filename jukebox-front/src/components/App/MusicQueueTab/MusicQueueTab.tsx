import { Box, Typography } from "@mui/material";
import { MusicQueue } from "../../../hooks/Socket.io/types";
import { ArtistsDisplay } from "../../Common/Artists";

export function MusicQueueTab({ queue }: { queue?: MusicQueue}) {
    return (
        <Box display='flex' sx={{ marginLeft: '1em', mt: '1em', flexDirection: 'column', pb: '4em'}}>
				{ !queue?.length || !queue[0].track ?	
					<Typography color='white'>Pas de track en file d'attente</Typography> 
				:	
                    <Box>
                        <Box sx={{ position:'fixed', left: 0, right: 0, top: '2em', backgroundColor: '#191414', height: '3em', pt: '1em' }}>
                            <Typography fontWeight='bold' paddingLeft='1em' marginBottom='0.5em' color='white' fontSize='2em'>File d'attente</Typography>
                        </Box>
                        <Box pt='4em'>
                            { queue.map((trackItem, index) => { 
                                const { track, user } = trackItem
                                
                                return (
                                    <Box key={track.id} display='flex' flexDirection='row' marginBottom='0.5em'>
                                        <Typography marginRight='0.5em' color={ index === 0 ? '#66D36E' : 'white'}>{ index === 0 ? '→' : index }</Typography>
                                        <Box>
                                            <Typography color={ index === 0 ? '#66D36E' : 'white'}>{ track.name }</Typography>
                                            <ArtistsDisplay style={{color: 'lightgrey', fontSize: '0.75em'}} artists={track.artists}/>
                                            { user.username && <Box alignItems='center' fontSize='0.75em' display='flex' color='grey'>Ajouté par <Typography fontSize='1em' ml='0.5em' fontWeight='bold' color={user.color}>{user.username}</Typography></Box>}
                                        </Box>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
				}
			</Box>
    )
}