import { Box, Typography } from "@mui/material"
import { TrackType } from "../../../hooks/Socket.io/types"


export const SearchInputContainer = ({ children }: { children: JSX.Element[] }) => (
    <Box style={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: '2em',
        backgroundColor: '#191414',
        borderBottom: '1px solid #191414',
        paddingBottom: '1em',
        filter: 'drop-shadow(0 10px 10px #191414)'
    }}>
        { children }
    </Box>
)

/* Displayed before a search or after a search with no results */
export const EmptySearchResultsPlaceholder = ({ tracks, isLoading }: { tracks: TrackType[], isLoading: boolean }) => (
    <Box>
        { tracks.length || isLoading ? null : (
            <Box color='white' sx={{ padding: '1em', minHeight: '100vh'}}>
                { tracks.length === 0 ? 
                    <Typography>Pas de résultat de recherche</Typography>
                :
                    <Typography>Effectuer une recheche dans le champs de texte</Typography>
                }
            </Box>
        )}
    </Box>
)

export const SearchResultsContainer = ({ children }: { children: JSX.Element[] | null }) => (
    <Box sx={{ position: 'relative', ml: '1em', mr: '1em', mt: '6em'}}>
        <Box sx={{ overflowY: 'scroll', zIndex: -1,  position: 'absolute', left: 0, right: 0, top: 0, pb: '4em'}}>
            { children }
        </Box>
    </Box>
)