import React, { useEffect } from 'react';
import './signup.scss';
import { FormGroup } from "../../components";
import * as yup from 'yup';
import { useForm, get } from 'react-hook-form';
import { useControlValidity } from '../../hooks';
import { yupResolver } from '@hookform/resolvers';

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
	onSignup(email: string, password: string): void;
}

export const SignupForm: React.FC = () => {
	const { formRef, setErrors } = useControlValidity();
	const { register, errors, handleSubmit } = useForm({
			mode: 'onSubmit',
			reValidateMode: 'onSubmit',
			resolver: yupResolver(signupSchema),
			shouldFocusError: true
		});

	useEffect(() => setErrors(errors), [errors, setErrors]);

	const handleSignup = (data: any) => {
		console.log(data);
	};

	return (
		<form ref={formRef} className='signup__form'>
			<FormGroup				
				label='Email'
				errorText={get(errors, 'email.message')}
				id='email'>
				<input autoFocus ref={register} className='input' type='text'/>
			</FormGroup>
			<FormGroup
				label='Password'
				errorText={get(errors, 'password.message')}
				id='password'>
				<input ref={register} className='input' type='password'/>
			</FormGroup>
			<FormGroup
				errorText={get(errors, 'confirm.message')}
				label='Confirm Password'
				id='confirm'>
				<input ref={register} className='input' type='password'/>
			</FormGroup>
			<button 
				onClick={handleSubmit(handleSignup)}
				type='button'
				className='button button--outlined button--primary signup__button'>
				Signup
			</button>
		</form>
	)
}