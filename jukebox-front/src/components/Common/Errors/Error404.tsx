import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Box, Typography } from '@mui/material'

export default function Error404 () {
	const { pathname } = useLocation()
	const navigate = useNavigate()

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
			<Typography color='white'>Error 404, path '{ pathname }' not found 🤔</Typography>
			<Button sx={{ mt: '2em' }} variant='contained' onClick={() => navigate('/')}>Go back top the app</Button>
		</Box>
	)
}