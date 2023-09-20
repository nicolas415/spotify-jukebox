import { Box } from '@mui/material';
import { useState } from 'react';
import { UserListType } from '../../../hooks/Socket.io/types';
import { memo } from 'react'
import { ShareApp, UserItem, UsersTabHeader, UsersTabHeaderButton } from './UsersTab.ui';

export default memo(function UsersTab ({ users } : { users?: UserListType}) {
	const [currentView, setCurrentView] = useState<'user_view' | 'share_view'>('share_view')

	return (
		<Box>
			<UsersTabHeader>
				<UsersTabHeaderButton 
					name='user_view' 
					currentView={currentView}
					setCurrentView={setCurrentView}
					text='Liste des participants'
				/>
				<UsersTabHeaderButton 
					name='share_view' 
					currentView={currentView}
					setCurrentView={setCurrentView}
					text="Partager l'application"
				/>
			</UsersTabHeader>

			{/* Users Tab content */}
			<Box mt='5em'>
				{
					currentView === 'user_view' ?
						!users ? null : Object.entries(users).map(([key, value]) => (
							<UserItem key={value.number} username={key} color={value.color}/>
						))
					:
					currentView === 'share_view' ?
						<ShareApp/>
					:
					null
				}
			</Box>
		</Box>
	)
})