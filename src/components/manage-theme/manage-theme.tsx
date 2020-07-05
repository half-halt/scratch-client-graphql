import React from 'react';
import './manage-theme.scss';
import { useTheme } from '../../hooks';
import { ReactComponent as DarkIcon } from '../../assets/lightbulb-regular.svg';
import { ReactComponent as LightIcon } from '../../assets/lightbulb-solid.svg';

export const ManageTheme: React.FC = () => {
	const [theme, setTheme] = useTheme();

	const changeTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();

		switch (theme)
		{
		case 'light':
			setTheme('dark');
			break;

		default:
			setTheme('light');
			break;
		}
	}

	let icon = <LightIcon/>;
	let name = 'Light';
	if (theme === 'dark')
	{
		icon = <DarkIcon/>
		name = 'Dark';
	}

	return (
		<button 
			className='setTheme__button'
			onClick={changeTheme}
			title={`Change to the ${name} theme`}>
			{icon}
		</button>
	)
}