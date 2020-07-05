import { atom, useRecoilValue, useRecoilCallback } from 'recoil'

type Theme = 'light' | 'dark';
type SetThemeFunction = (theme: Theme) => void;

/**
 * Sets the theme to the specified string, and saves the result in 
 * local storage.  this is noop if it already the current theme.
 */
const changeTheme = (theme: Theme) =>
{
	const classname = `theme-${theme}`;
	if (document.documentElement.className !== classname) {
		document.documentElement.className = classname;
		localStorage.setItem('theme', theme);
	}
}

/**
 * Sets the initial them on startup, this will check if we have a saved 
 * state and use that, or determine a reasonable default.
 */
export const setInitialTheme = (): Theme => 
{
	const saved = localStorage.getItem('theme');
	switch (saved) 
	{
	case 'light':
	case 'dark':
		document.documentElement.className = `theme-${saved}`;
		return saved as Theme;
	}

	let theme: Theme = 'light';
	if (typeof window.matchMedia === 'function') 
	{
		const query = window.matchMedia('(prefers-color-scheme)');
		if (query && query.media === 'dark')
		{
			theme = 'dark';
		}
	}

	changeTheme(theme);
	return theme;
}

/**
 * Current theme atom
 */
const themeState = atom<Theme>({
	key: 'themeState',
	default: localStorage.getItem('theme') as Theme || 'light'
});

/**
 * Simple hook which provides the current theme and a 
 * way to set the curren theme.
 */
export const  useTheme = (): [string, SetThemeFunction] =>
{
	const setTheme = useRecoilCallback(({snapshot, set}) => async (newTheme: Theme) => {
			const theme = await snapshot.getPromise(themeState);
			if (theme !== newTheme)
			{
				changeTheme(newTheme);
				set(themeState, newTheme);
			}
		});

	const theme = useRecoilValue(themeState);
	return [theme, setTheme];
}