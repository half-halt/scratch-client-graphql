import React from 'react';
import './home.scss';
import { CenterLayout } from "../../layouts"

export const Home: React.FC = () => { 
	return (
		<CenterLayout>
			<div className='homepage__lander'>
				<h1>Scratch</h1>
				<p>A simple note taking app</p>
			</div>
		</CenterLayout>
	);
}