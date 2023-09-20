import { useRouteError } from "react-router-dom";
import { getErrorMessage } from "../../../utils";
import { Box, Typography } from "@mui/material";

export default function ErrorEl() {
	const error = useRouteError();
	const errorMessage = getErrorMessage(error)

	return (
		<Box display='flex' flexDirection='column' alignItems='center' justifyContent={'center'}>
			<Typography color='white' fontSize="1em">Oooops, an error occured</Typography>
			<Typography color='tomato' textAlign='center' p='1em' fontSize="2em">{errorMessage}</Typography>
			<Typography fontSize='3em'>😱</Typography>
		</Box>
	)
}
