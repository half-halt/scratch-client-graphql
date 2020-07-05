import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, NotFound } from '.';
import { Login } from './login/login';
import { Logout } from  './logout/logout';
import { Signup } from './signup/signup';

export const Routes: React.FC = () => {
	return (
		<Switch>
			<Route exact path='/' component={Home}/>
			<Route path='/login' component={Login}/>
			<Route path='/logout' component={Logout}/>
			<Route path='/signup' component={Signup}/>
			<Route component={NotFound}/>
		</Switch>
	)
}