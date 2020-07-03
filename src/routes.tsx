import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, NotFound } from './pages';

export const Routes: React.FC = () => {
	return (
		<Switch>
			<Route exact path='/' component={Home}/>
			<Route component={NotFound}/>
		</Switch>
	)
}