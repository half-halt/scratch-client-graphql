import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Home, NotFound } from '.';
import { Login } from './login/login';
import { Logout } from  './logout/logout';
import { Signup } from './signup/signup';

const primaryRoutes = [
	{ path: '/', element: <Home/> },
	{ path: '/login', element: <Login/>	},
	{ path: '/logout', element: <Logout/> },
	{ path: '/signup/*', element: <Signup/> },
	{ path: '*', element: <NotFound/> }

];

export const Routes: React.FC = () => 
{
	return useRoutes(primaryRoutes);
}