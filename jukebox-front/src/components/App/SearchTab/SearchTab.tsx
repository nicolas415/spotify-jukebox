import { Box, Typography, Popover } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { playSpotifyTrack, postSpotifySearch } from '../../../requests';
import TrackItem from './elements/TrackItem';
import SearchForm from './elements/SearchForm';
import { useDispatch } from 'react-redux';
import { saveSearchResults } from '../../../redux/slices/cachedResults';
import { TrackType } from '../../../hooks/Socket.io/types';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { EmptySearchResultsPlaceholder, SearchInputContainer, SearchResultsContainer } from './SearchTab.ui';

/**
 * The screen compoenent for the search tab of the main App component
 * 
 * Allows to search a track and play it
 */
export default memo(function SearchTab ({ tracks, searchQuery }: { tracks: TrackType[], searchQuery: string }) {
	const dispatch = useDispatch()
	const inputRef = useRef<HTMLInputElement>(null)
	const containerRef = useRef<HTMLInputElement>(null)
	const [showAddToQueueMessage, setShowAddToQueueMessage] = useState(false)
	const [addToQueueMessage, setAddToQueueMessage] = useState<{ message: string, color: string, el: EventTarget | null}>({ message: '', color: '', el: null })
	const timerRef = useRef<NodeJS.Timeout | null>(null)

	/**
	 * Search request to Spotify API
	 */
	const { mutate, isLoading } = useMutation(['spotify-search'], {
		mutationFn: postSpotifySearch,
		onSuccess: (data) => {
			dispatch(saveSearchResults({ searchQuery, tracks: data.tracks.items }))
		}
	})

	/**
	 * Display the message for 1 second
	 */
	useEffect(() => {
		if (showAddToQueueMessage && !timerRef.current) {
			timerRef.current = setTimeout(() => setShowAddToQueueMessage(false), 1000)
		}

		return () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current)
				timerRef.current = null
			}
		}
	}, [showAddToQueueMessage])

	/**
	 * Logic triggered when playing a track,
	 * or adding it to the queue if a user track is already playing
	 */
	const playTrack = useCallback(async (track: TrackType, element: EventTarget | null) => {
		if (typeof track.id === 'string' && track.id) {
            try {
                const { data } = await playSpotifyTrack({ trackId: track.id })
				if (data.already_in_queue) {
					setAddToQueueMessage({ message: 'Track déjà ajouté à la file d\'attente', color: 'tomato', el: element })
				}
				else {
					setAddToQueueMessage({ message: 'Track ajouté à la file d\'attente', color: 'green', el: element })
				}

				setShowAddToQueueMessage(true)
            } catch(e) {
                console.log(e)
            }
		}
	}, [])

	return (
		<Box ref={containerRef} sx={{ flexDirection: 'column' }}>
			<Popover open={showAddToQueueMessage}>
				<Typography 
					sx={{ backgroundColor: addToQueueMessage.color }}
					color='white'
					fontSize='1.25em'
					paddingY='0.5em'
					paddingX='1em'
				>{ addToQueueMessage.message }</Typography>
			</Popover>
			
			<SearchInputContainer>
				<SearchForm formRequest={mutate} searchQuery={searchQuery} inputRef={inputRef}/>
				<EmptySearchResultsPlaceholder tracks={tracks} isLoading={isLoading} />
			</SearchInputContainer>

			
			<SearchResultsContainer>
				{ !tracks?.length ? null : tracks.map(track => (
					<TrackItem key={track.id} item={track} onClick={(e) => playTrack(track, e.target)} />
				))}
			</SearchResultsContainer>
		</Box>
	)
})