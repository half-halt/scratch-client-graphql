import { useRecoilState, selector, DefaultValue } from 'recoil';
import { userTokenValue } from './use-is-authenticated';

const userToken = selector<string|null>({
	key: 'userToken',
	get: ({get}) => {
		console.log('userTokenValue:', get(userTokenValue));
		return get(userTokenValue);
	},
	set: ({set}, value) => {
			if ((value instanceof DefaultValue) ||
				(typeof(value) !== 'string') ||
				(value.length === 0))
			{
				// We are clearing the user token
				set(userTokenValue, null);
			}
			else
			{
				// We are setting the user token a valid token
				set(userTokenValue, value);
			}
		}
})

/**
 * This hook provides access t the user token, the return values are the 
 * user token or null, and a function to set the user token.  For most 
 * consumers 'useUIsAuthenticated' provides enough state.
 */
export const useUserToken = () => 
{
	return useRecoilState(userToken);
}

