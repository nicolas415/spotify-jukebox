import { ButtonBig } from "../../Common/Touchables/ButtonBig"
import { Box } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { getSpotifyLoginURI } from "../../../requests"

/**
 * Component that authorizes the app by redirecting to Spotify authentication page
 */
export default function AuthorizeApp() {
	const { data } = useQuery(['get-spotify-login-uri'], getSpotifyLoginURI)

	async function spotifyRedirect() {
		if (data?.spotifyLoginURI) {
			window.location.assign(data.spotifyLoginURI)
		}
	}
	return (
		<Box display='flex' flexDirection='column' alignItems='center' justifyContent={'center'}>
			<ButtonBig disabled={!data?.spotifyLoginURI} onClick={spotifyRedirect} children="Connexion à Spotify" />
		</Box>
	)
}
