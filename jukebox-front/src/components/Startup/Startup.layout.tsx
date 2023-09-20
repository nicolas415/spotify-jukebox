import { Box, Typography,  } from "@mui/material"
import { Outlet } from "react-router-dom"

/**
 * Layout for the /auth route
 * 
 * Subroutes are displayed in the `<Outlet/>` component
 */
export default function StartupLayout() {

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'stretch',
				flexDirection: 'column',
				height: '100vh',
				flexBasis: 12,
			}}
		>
			{/* Header container */}
			<Box sx={{display: 'flex'}} width="20em" height="3em" pt={'1em'}>
				<Typography fontSize={'2em'} color={'primary'} children="Jukebox (Beta)" />
			</Box>
			{/* App content */}
			<Box display='flex' justifyContent='center' flexGrow={10}>
				<Outlet/>
			</Box>
			{/* Last Box serves as a padding for centering the Outlet */}
			<Box display='flex' pb='1em' height={'3em'}/>
		</Box>
	)
}
