import React, { useEffect } from 'react';
import { useUserToken } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { CenterLayout } from '../../layouts';
import { Loader, LoaderSize } from '../../components';

export const Logout: React.FC = () =>
{
	const navigate = useNavigate();
	const [token, setToken] = useUserToken();

	useEffect(() => {
		console.log('logging out');
		if (token && (typeof(token) === 'string'))
		{
			const startTime = Date.now();
			Auth.signOut().finally(
				() => {
					setTimeout(() => {
						setToken(null);
						navigate('/');
					}, Math.max(0, Date.now() - startTime - 400));
				});
		}
		else
		{
			navigate('/');
		}
	}, [token, setToken, navigate]);

	return (
		<CenterLayout>
			<Loader size={LoaderSize.Medium} text='Logging out...'/>
		</CenterLayout>		
	);
}