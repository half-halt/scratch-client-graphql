import React, { useState } from 'react';
import { CenterLayout } from '../../layouts';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './signup.scss';
import { SignupForm } from './signup-form';
import { ConfirmationForm } from './confirmation-form';
import { ThankYou } from "./thank-you";

/**
 * Interface returned from Amplify signup, the parts we consume
 */
export interface ConfirmationInfo
{
	email: string;
	password: string;
	deliveryType: string;
	destination: string;
}

/**
 * Implements the sign-up feature.  For this application it is very simple
 * with only a single form and confirmation, you could add additional steps
 * with additional routes.
 */
export const Signup: React.FC = () => 
{
	const [confirm, setConfirm] = useState<ConfirmationInfo|null>(null);
	const navigate = useNavigate();
	
	const handleConfirm = (confirmationInfo: ConfirmationInfo) => {
		setConfirm(confirmationInfo);
		navigate('confirm');
	}

	const handleComplete = () => {
		navigate('/');
	}

	return (
		<CenterLayout>
			<Routes>
				{(confirm !== null) &&
					<Route 
						path='confirm'
						element={ <ConfirmationForm 
							confirmation={confirm} 
							onConfirmed={handleComplete}
							/>
						}/>
				}
				<Route
					path='thanks'
					element={
						<ThankYou/>
					}/>
				<Route 
					path='*'
					element={ <SignupForm 
						onSignupComplete={handleConfirm}
						/>
					}/>
			</Routes>			
		</CenterLayout>
	)
}