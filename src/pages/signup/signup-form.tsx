import React, { useEffect, useCallback, useState } from 'react';
import './signup.scss';
import { FormGroup, LoadingButton } from "../../components";
import * as yup from 'yup';
import { useForm, get } from 'react-hook-form';
import { useControlValidity } from '../../hooks';
import { yupResolver } from '@hookform/resolvers';
import { Auth } from 'aws-amplify';
import { isEmpty } from 'lodash';
import { ConfirmationInfo } from './signup';
import { CSSTransition } from 'react-transition-group';
import { ensureTransitionTime } from '../../util';

const signupSchema = yup.object().shape({
	email: yup.string()
		.required('A valid email address is requried.')
		.email('An invalid email address was entered. (Example: user@example.com)'),
	password: yup.string()
		.required('A valid password is required.')
		.min(8, 'A password must be at least 8 chacters long.')
		.matches(/[A-Z]+/, 'A password must contain at least one uppercase letter')
		.matches(/[0-9]+/, 'A password must contain at least one numeral')
		.matches(/(\W|_)+/, 'A password must contain at least one special character'),
	confirm: yup.string()
		.oneOf([yup.ref('password'), ''], 'The passwords to not match')
});


export interface SignupFormProps
{
	onSignupComplete(confrimationInfo: ConfirmationInfo): void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ 
	onSignupComplete: handleComplete
}) => {
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const { formRef, setErrors } = useControlValidity();
	const { register, errors, handleSubmit } = useForm({
			mode: 'onSubmit',
			reValidateMode: 'onSubmit',
			resolver: yupResolver(signupSchema),
			shouldFocusError: true
		});

	useEffect(() => setErrors(errors), [errors, setErrors]);

	const handleSignup = useCallback(async (data: any) => {
		const startTime = Date.now();

		// When this gets called, we know our data matches the shape
		// of the data in the above schema.
		setLoading(true);
		setErrorMessage('');

		try 
		{
			const user = await Auth.signUp({
				username: data.email,
				password: data.password
			});

			ensureTransitionTime(startTime, () => {
				setLoading(false);
				handleComplete({
					deliveryType: user.codeDeliveryDetails.DeliveryMedium,
					destination: user.codeDeliveryDetails.Destination,
					email: data.email,
					password: data.password
				})
			});
		}
		catch (error)
		{
			let message = get(error, 'message');
			if (isEmpty(message) && (error instanceof Error))
				message = error.toString();
			
			ensureTransitionTime(startTime, () => {
				setErrorMessage(message || 'An unknown error has occured');
				setLoading(false);
			});
		}
	}, [handleComplete]);

	return (
		<form ref={formRef} className='signup__form'>
			<CSSTransition 
				mountOnEnter={true}
				unmountOnExit={true}
				out={loading}
				in={!loading && !isEmpty(errorMessage)}  
				classNames='login__error--transition' 
				timeout={250}>
				<div className='signup__error'>
					<h3>Signup Error</h3>
					<p>{errorMessage}</p>
				</div>
			</CSSTransition>			
			<FormGroup				
				label='Email'
				errorText={get(errors, 'email.message')}
				id='email'>
				<input autoFocus ref={register} className='input' type='text' disabled={loading}/>
			</FormGroup>
			<FormGroup
				label='Password'
				errorText={get(errors, 'password.message')}
				id='password'>
				<input disabled={loading} ref={register} className='input' type='password'/>
			</FormGroup>
			<FormGroup
				errorText={get(errors, 'confirm.message')}
				label='Confirm Password'
				id='confirm'>
				<input disabled={loading} ref={register} className='input' type='password'/>
			</FormGroup>
			<LoadingButton 
				onClick={handleSubmit(handleSignup)}
				type='button'
				disabled={loading}
				loading={loading}
				className='button button--outlined button--primary signup__button'>
				Signup
			</LoadingButton>
		</form>
	)
}