import React, { useLayoutEffect, useCallback, useState } from 'react';
import { CenterLayout } from '../../layouts';
import { FormGroup, LoaderSize, Loader } from '../../components';
import { Auth } from 'aws-amplify';
import * as yup from 'yup';
import { useForm, get } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useControlValidity, useUserToken } from '../../hooks'; // '~/hooks'
import './login.scss';

enum LoginState
{
	None,
	Loading,
	Error,
	Complete
}

const loginSchema = yup.object().shape({
	email: yup.string()
		.required('A valid email address must be provided')
		.email('The email address is not valid. (Example: user@domain.com)'),
	password: yup.string()
		.required('A valid password must be entered')
		.min(8, 'The password must be a minimum of 8 characters')
});

export const Login: React.FC = () => 
{
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [ _, setToken ] = useUserToken();
	const [ state, setState ] = useState(LoginState.None);
	const { formRef, setErrors } = useControlValidity();
	const { register, errors, handleSubmit  } = useForm({
			mode: 'onSubmit',
			reValidateMode: 'onSubmit',
			resolver: yupResolver(loginSchema),
			shouldFocusError: true
		});

	useLayoutEffect(() => {
		setErrors(errors || {});
	}, [errors, setErrors]);


	//
	//  Why useCabllack?  
	//
	// This form will be rendered a bunch, especially with validation 
	// nothing here really changes so we don't want to recreate this function
	// with each and every render, so this servers as a performance optmizaton,
	// but we also use 'setTimeout' to imrpove the user experiance so we we don't
	// want unnoecessary copies of this to be made.
	//
	const login = useCallback(async(data: any) => {
		try
		{
			setState(LoginState.Loading);
			const signinResult = await Auth.signIn(data.email, data.password);
			
			// We logged in succesfully, howeever, it it was very fast we
			// don't want flicker, so we're going to place a 400ms forced delay
			// so the ruser can see animation.
			setTimeout(() => {
				setToken(signinResult.signInUserSession.accessToken.jwtToken);
				setState(LoginState.Complete);
			}, 400);
		}
		catch (error)
		{
			console.error(error);

			// See the comment above about the setTimeout.
			setTimeout(() => setState(LoginState.Error), 400);
		}
	}, [setState, setToken]);

	if (state === LoginState.Complete)
	{
		return (
			<Redirect to="/"/>
		)
	}

	const loading = (state === LoginState.Loading);
	return (
		<CenterLayout>
			<form ref={formRef} className='login__form'>
				{state === LoginState.Error && 
					<div className='login__error'>
						<h6 className='login__errorheader'>Authentication Failed</h6>
						Please verify your credentials and retry the login. 
					</div>
				}
				<FormGroup 
					label="Email" 
					id="email" 
					errorText={get(errors, 'email.message')}>
					<input autoFocus ref={register} type='text' disabled={loading}/>
				</FormGroup>
				<FormGroup 
					errorText={get(errors, 'password.message')}
					label="Password" 
					id="password">
					<input ref={register} type='password' disabled={loading}/>
				</FormGroup>
				<div className='login__buttons'>
					<button 
						className='login__button--loading'
						type='button' 
						onClick={handleSubmit(login)} 
						disabled={loading}>
						Login
						<CSSTransition in={loading} mountOnEnter unmountOnExit timeout={250} classNames="login__loading--">
							<div className='login__loading'>
								<Loader size={LoaderSize.Small}/>
							</div>
						</CSSTransition>
					</button>
				</div>
			</form>
		</CenterLayout>
	);
}