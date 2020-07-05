import React, { useEffect, useState } from 'react';
import { useUserToken } from '../../hooks';
import { Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { CenterLayout } from '../../layouts';
import { Loader, LoaderSize } from '../../components';

export const Logout: React.FC = () =>
{
	const [loggedOut, setLoggedOut] = useState(false);
	const [token, setToken] = useUserToken();

	useEffect(() => {
		console.log('logging out');
		if (token && (typeof(token) === 'string'))
		{
			Auth.signOut().finally(
				() => {
					setTimeout(setToken.bind(null, null), 2500);
					setTimeout(setLoggedOut.bind(null, false), 2550);
				});
		}
	}, [token, setToken]);

	// If we are now logged out, or out token was invalid
	// we are now done here.
	if (loggedOut || (typeof(token) !== 'string')) 
	{
		return <Redirect to='/'/>;
	}

	return (
		<CenterLayout>
			<Loader size={LoaderSize.Medium} text='Logging out...'/>
		</CenterLayout>		
	);
}