import { Box, Typography, Button, SvgIconTypeMap } from "@mui/material";
import { Person } from '@mui/icons-material';
import { OverridableComponent } from "@mui/material/OverridableComponent";

/**
 * Main application screen header element
 * Header elements are passed as children
 */
export const AppHeader = ({ children }: { children: JSX.Element}) => {
    const HeaderStyle = {
        backgroundColor: '#66D36E',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2em',
        display: 'flex',
        justifyContent: 'flex-end'
    }

    return (
        <Box sx={HeaderStyle}>
            { children }
        </Box>
    )
}

/**
 * Header button that opens the user menu
 */
export const UserMenuButton = ({ username, userMenuOpened, onClick }: 
    { username: string, userMenuOpened: boolean, onClick: () => void }
) => {
    return (
        <Button 
            sx={userMenuOpened ? {} : { filter: 'brightness(0.9)'}} 
            onClick={onClick}
            variant='contained'
        >
            <Person/>
            <Typography fontWeight='bold'>{ username }</Typography>
        </Button>
    )
}

/**
 * Main application screen footer element
 */
export const AppFooter = ({ children }: { children: JSX.Element[] }) => (
    <Box
        sx={{ backgroundColor: '#66D36E' }}
        height='4em'
        position='fixed'
        bottom={0}
        left={0}
        right={0}
        display='flex'
        alignItems='center'
        justifyContent='space-around'
    >
        { children }
    </Box>
)

type MuiIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }
type Tabs = 'search' | 'player' | 'queue'

/**
 * Tab button template used for the main application navigation
 * Should be displayed in the application footer element
 */
export const TabButton = ({ tabName, activeTab, onClick, Icon }: 
    { tabName: Tabs, activeTab: string, onClick: (tabName: Tabs) => void, Icon: MuiIcon }
) => {
    const TabButtonStyle = {
        borderRadius: 0,
        backgroundColor: '#66D36E',
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }

    return (
        <Button
            onClick={() => onClick(tabName)}
            sx={TabButtonStyle}
            style={activeTab === tabName ? {} : { filter: 'brightness(0.8)' } }
        >
            <Icon htmlColor="white" fontSize="large"/>
        </Button>
    )
}
