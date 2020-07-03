import React from 'react';
import './home.scss';

export const Home: React.FC = () => { 
	return (
		<div className='homepage'>
			<div className='homepage__lander'>
				<h1>Scratch</h1>
				<p>A simple note taking app</p>
			</div>
		</div>
	);
}