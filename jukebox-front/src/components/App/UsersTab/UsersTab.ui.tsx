import { Box, Button, Typography } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { Dispatch, SetStateAction } from "react";

export const UsersTabHeader = ({ children }: { children: JSX.Element[] }) => (
    <Box
        width='100%'
        display='flex'
        flexDirection='row'
        flexBasis={2}
        marginBottom='2em'
        position='fixed'
        top='2em'
    >
        { children }
    </Box>
)

type UsersTabSections = "user_view" | "share_view"

export const UsersTabHeaderButton = ({ text, setCurrentView, name, currentView }: 
    { text: string, setCurrentView: Dispatch<SetStateAction<UsersTabSections>>, name: UsersTabSections, currentView: UsersTabSections }
) => {
    
    return (
        <Button 
            sx={{
                flexGrow: 1,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0
            }}
            onClick={() => setCurrentView(name)}
            variant={ name === currentView ? 'contained' : 'text'}
        >
            { text }
        </Button>
    )
}

export const UserItem = ({ username, color }: { username: string, color: string }) => {
    return (
        <Box height='2.5em' ml='1em' alignItems='center' display='flex'>
            <Typography fontSize='3rem' mr='0.25em' color={color}>•</Typography>
            <Typography fontWeight='bold' fontSize='1.5rem' color='white'>{username}</Typography>
        </Box>
    )
}

export const ShareApp = () => {
    return (
        <Box sx={{ flexDirection: 'column', ml: '1em', mr: '1em', mt: '1em', display: 'flex', alignItems: 'center' }}>
            <Typography color='white'>Scanner pour partager l'application</Typography>
            <QRCodeSVG size={200} style={{ marginTop: '5em', border: '5px solid white'}} value={window.location.origin}/>
        </Box>
    )
}