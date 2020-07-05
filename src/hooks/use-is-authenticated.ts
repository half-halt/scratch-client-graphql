import { atom, useRecoilValue, selector } from 'recoil';
import { Auth } from 'aws-amplify';
import { configureAmplify } from '../aws';

export const userTokenValue = atom<string|null>({
	key: 'userTokenValue',
	default: new Promise<string|null>(
		(resolve, reject) => {
			configureAmplify()
			Auth.currentSession().then(
				(session) => {
					const token = session.getAccessToken();
					console.log('token', token);
					resolve(token.getJwtToken());
				},
				(error) => {
					if (error !== 'No current user')
						console.error('Failed to get current session:', error);

					// If we get here assume we do not have a valid user session
					resolve(null);
				}
			);
		})
	});

const isAuthSelector = selector<boolean>({
	key: 'isAuthenticated',
	get: ({get}) => {
			const token = get(userTokenValue);
			return (typeof(token) === 'string') && (token.length !== 0);
		}
	});

export const useIsAuthenticated = () => {
	return useRecoilValue(isAuthSelector);
}
