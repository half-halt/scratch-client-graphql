import React, { useLayoutEffect, useState } from 'react';
import { FormGroup, LoadingButton } from '../../components';
import * as yup from 'yup';
import { useForm, get } from 'react-hook-form';
import { useUserToken, useControlValidity } from '../../hooks';
import { yupResolver } from '@hookform/resolvers';
import { ConfirmationInfo } from './signup';
import { Auth } from 'aws-amplify';
import { isEmpty, isFunction } from 'lodash';
import { CSSTransition } from 'react-transition-group';
import { ensureTransitionTime } from '../../util';

const confirmSchema = yup.object().shape({
		code: yup.string()
			.required('You must enter a confirmation code')
			.matches(/[0-9]+/, 'A verification code may only contain numbers')
	});

export interface ConfirmationFormProps
{
	confirmation: ConfirmationInfo;
	onConfirmed(): void;
}

export const ConfirmationForm: React.FC<ConfirmationFormProps> = ({
	onConfirmed: handleConfirmed,
	confirmation
}) => {
	// eslint-disable-next-line 	
	const [ _token, setToken] = useUserToken();
	const [ loading, setLoading ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState('');
	const { formRef, setErrors } = useControlValidity();
	const { register, errors, handleSubmit } = useForm({
			mode: 'onSubmit',
			reValidateMode: 'onSubmit',
			resolver: yupResolver(confirmSchema),
			shouldFocusError: true
		});

	// Handle confirming the user, when this is called we know 
	// that formData passed the validation above.
	const handleConfirm = async (formData: any) => {
			const startTime = Date.now();
			setLoading(true);
		
			try
			{
				console.log('confirmation', confirmation);
				// COnfirm the account
				await Auth.confirmSignUp(confirmation.email, formData.code);

				// Log the user in
				const signinResult = await Auth.signIn(confirmation.email, confirmation.password);
				ensureTransitionTime(startTime, () => {
					setErrorMessage('');
					setToken(signinResult.signInUserSession.accessToken.jwtToken);
					handleConfirmed();
				});
			}
			catch (error)
			{
				console.log('confirm', error);
				let message = error.message;
				if (isEmpty(message) && isFunction(error.toString))
					message = error.toString();
				if (isEmpty(message))
					message = String(error);
					
				ensureTransitionTime(startTime, () => {
					setErrorMessage(message || 'An unknown error occurred please try again.');
					setLoading(false);
				});
			}
		};

	useLayoutEffect(() => setErrors(errors), [errors, setErrors]);
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
					<h3>Confrimation Error</h3>
					<p>{errorMessage}</p>
				</div>
			</CSSTransition>
			<FormGroup				
				label='Confirmation Code'
				helpText={`Your code was sent to '${confirmation.destination}'.`}
				errorText={get(errors, 'code.message')}
				id='code'>
				<input ref={register} autoFocus className='input' type='tel'/>
			</FormGroup>
			<LoadingButton 
				loading={loading}
				onClick={handleSubmit(handleConfirm)}
				type='button'
				className='button button--outlined button--primary signup__button'>
				Verify
			</LoadingButton>
		</form>
	);
}