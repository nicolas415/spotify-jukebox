import { FormEvent, useEffect, useState } from "react"
import { RegisterMessage, RegisterUserForm } from "./RegisterUser.ui.tsx"
import { useMutation } from "@tanstack/react-query"
import { registerUser } from "../../../requests/index.ts"
import { getErrorMessage } from "../../../utils/index.ts"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { emptySearchResults } from "../../../redux/slices/cachedResults.ts"
import { Box } from "@mui/material"

/**
 * Logical component for the user registering route
 */
export default function RegisterUser() {
	const [username, setUsername] = useState('')
	const [error, setError] = useState('')
	const dispatch = useDispatch()

	const navigate = useNavigate()
	const { mutate } = useMutation(['register-user'], registerUser)

	/**
	 * Empty search results from redux cache,
	 * to reset user's search results 
	 */
	useEffect(() => {
		dispatch(emptySearchResults())
	}, [])

	function onChange(text: string) {
		if (error) {
			setError('')
		}
		setUsername(text)
	}

	async function submitUsername(e: FormEvent) {
		e.preventDefault()

		if (!username) {
			setError('Entrez un nom d\'utilisateur')
			return
		}

		mutate(username, {
			onSuccess: (res) => {
				if (res.registered) {
					navigate('/app')
				} else {
					setError(res.message)
				}
			},
			onError: (e) => {
				setError(getErrorMessage(e))
			}
		})
	}

	return (
		<Box display='flex' flexDirection='column' flexBasis={3} alignItems='center' justifyContent='center'>
			<RegisterMessage/>
			<RegisterUserForm 
				onChange={onChange}
				submitUsername={submitUsername} 
				error={error}
				username={username}
				/>
		</Box>
	)
}
