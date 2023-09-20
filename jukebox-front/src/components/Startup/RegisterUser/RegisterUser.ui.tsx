import { Typography, Box, TextField } from "@mui/material";
import { ButtonBig } from "../../Common/Touchables/ButtonBig";
import { FormEvent, useRef } from "react";

/**
 * Layout component for the user registering route
 */
export function RegisterUserForm({ submitUsername, error, onChange, username }: { 
	submitUsername: (e: FormEvent) => Promise<void>, error: string, onChange: (text: string) => void, username: string
}) {
	const formRef = useRef<HTMLFormElement>(null)

	return (
		<Box display='flex' flexGrow={1} flexDirection='column' alignItems='center' justifyContent='center'>
			<form onSubmit={submitUsername} ref={formRef}>
				<TextField
					InputProps={{ sx: { borderRadius: '25px', fontSize: '2em', backgroundColor: 'white' }}} 
					inputProps={{ style: { height: '1.5em' }}} 
					style={{ width: '20em', marginBottom: '8em' }} 
					placeholder="Ton pseudo" 
					type="text"
					onChange={(input) => onChange(input.target.value)}
					error={!!error}
					helperText={error}
				/>
			</form>
			<ButtonBig disabled={!username} onClick={() => formRef?.current?.requestSubmit()}>Démarrer</ButtonBig>
		</Box>
	)
}

export const RegisterMessage = () => (
	<Box display='flex' flexGrow={2} flexDirection='column' alignItems='flex-start' justifyContent='center'>
		<Typography color='white' fontSize={'2em'}>Bienvenue !</Typography>
		<Typography color='white' fontSize={'1.5em'}>Entre ton pseudo pour commencer à passer de la musique 💿</Typography>
	</Box>
)