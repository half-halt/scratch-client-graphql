import React from 'react';
import './signup.scss';
import { useNavigate } from 'react-router';

export const ThankYou = () =>
{
	const navigate = useNavigate();

	return (
		<div className='lander__block'>
			<h1>Signup Complete</h1>
			<p>
				Thank your for signing up to use Scratch.
			</p>
			<p>
				Click <em>Start</em> to begin taking your notes.
			</p>
			<button 
				onClick={() => navigate('/')}
				className='button button--accent button--outlined signup__startButton'>
				Start
			</button>
		</div>
	)
}