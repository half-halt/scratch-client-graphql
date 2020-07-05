import React, { useState } from 'react';
import { CenterLayout } from '../../layouts';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import './signup.scss';
import { SignupForm } from './signup-form';


export const Signup: React.FC = () => 
{
	const { path } = useRouteMatch();
console.log('path', path);
	return (
		<CenterLayout>
			<Switch>
				<Route path={`${path}/confirm`}>
					<div>confirm</div>
				</Route>
				<Route>
					<SignupForm/>
				</Route>
			</Switch>			
		</CenterLayout>
	)
}