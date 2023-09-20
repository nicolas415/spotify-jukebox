import { Box } from "@mui/material";
import { Search, MusicNote, QueueMusic } from '@mui/icons-material';
import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { useSocketEvent } from "../../hooks/Socket.io";
import { PlaybackStateType, MusicQueue, UserListType } from "../../hooks/Socket.io/types";

import { AppFooter, AppHeader, TabButton, UserMenuButton } from "./App.ui";
import PlayerTab from "./PlayerTab/PlayerTab";
import SearchTab from "./SearchTab/SearchTab";
import UsersTab from "./UsersTab/UsersTab";
import { MusicQueueTab } from "./MusicQueueTab/MusicQueueTab";

import { selectCachedSearchResults } from "../../redux/selectors";
import { getCookieByName } from "../../utils";
import { useFormatPlaybackState } from "../../hooks/playback-hooks";


type Tabs = 'search' | 'player' | 'queue'

/**
 * The layout Component for the main app route
 * 
 * Displays 3 tabs at the bottom of the screen.
 * Each tab navigates to its corresponding screen when clicked
 */
export default function AppLayout() {
	const username = useRef(getCookieByName('jb_usr'))

	// navigation related
	const [activeTab, setActiveTab] = useState<Tabs>('search')
	const [userMenuOpened, setUserMenuOpened] = useState(false)

	// Playback, search and users related
	const { tracks, searchQuery } = useSelector(selectCachedSearchResults)
	const queueState = useSocketEvent<MusicQueue>(['auto_queue_snapshot', 'auto_queue_update', 'users_queue_update', 'users_queue_snapshot'])
	const playbackState = useSocketEvent<PlaybackStateType>('playback-state')
	const { progressPercent, durationsFormated } = useFormatPlaybackState(playbackState)
	const usersList = useSocketEvent<UserListType>(['users_list_snapshot', 'new_user_registered'])
	const nextTrackRequests = useSocketEvent<string[]>('next_requested')

	const changeTab = useCallback((tabName: Tabs) => {
		setUserMenuOpened(false)
		setActiveTab(tabName)
	}, [])

	return (
		<>
			<AppHeader>
				<UserMenuButton
					username={username.current !== null ? decodeURI(username.current) : 'user_menu'}
					userMenuOpened={userMenuOpened}
					onClick={() => setUserMenuOpened(!userMenuOpened)}
				/>
			</AppHeader>

			{/* App Navigation */}
			<Box sx={{pt: '2em'}}>
				{ 	
					userMenuOpened ?
						<UsersTab 
							users={usersList} 
						/>
					:
					activeTab === 'search' ?
						<SearchTab 
							tracks={tracks} 
							searchQuery={searchQuery}
						/>
					:
					activeTab === 'player' ?
						<PlayerTab 
							users={usersList} 
							nextReqs={nextTrackRequests} 
							playbackState={playbackState} 
							progressPercent={progressPercent} 
							durationsFormated={durationsFormated}
						/>
					:
					activeTab === 'queue' ?
						<MusicQueueTab queue={queueState}/>
					:
						null
				}
			</Box>

			<AppFooter>
				<TabButton tabName="search" activeTab={activeTab} onClick={changeTab} Icon={Search}></TabButton>
				<TabButton tabName="player" activeTab={activeTab} onClick={changeTab} Icon={MusicNote}></TabButton>
				<TabButton tabName="queue" activeTab={activeTab} onClick={changeTab} Icon={QueueMusic}></TabButton>
			</AppFooter>
		</>
	)
}
