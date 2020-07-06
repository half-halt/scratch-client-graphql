import React, { ButtonHTMLAttributes, useState, useLayoutEffect } from 'react';
import './loader.scss';
import { Loader, CustomSize } from './loader';
import { CSSTransition } from 'react-transition-group';

export interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>
{
	loading?: boolean;
}

/**
 * This implements a button with a loader, this is a drop in replacement for <button/>
 * it doesn't add any styling on it's own.  It uses the size of the button to setup
 * size of the loader.
 * 
 * Note: this takes advantage of the CSSTransitions ability to mount/unmount components
 * when they are no visible, this prevents the spinner from taking CPU time when it isn
 * visible. You can verify it's not in the tree using the browsers development tools.
 */
export const LoadingButton: React.FC<React.PropsWithChildren<LoadingButtonProps>> = ({
	loading,
	children,
	...rest
}) => {
	const [ element, setElement ] = useState<HTMLButtonElement|null>(null);
	const [ size, setSize ] = useState<CustomSize>({ width: 0, height: 0 });

	useLayoutEffect(() => {
			if (element)
			{
				const height = `${element.scrollHeight}px`;
				setSize({
					height,
					width: height
				});
			}
		}, [children, element])

	return (
		<button {...rest} ref={setElement} style={{position:'relative'}}>
			{children}
			<CSSTransition in={loading} mountOnEnter unmountOnExit timeout={250} classNames="loadingButton--">
				<div className='loadingButton'>
					<Loader customSize={size}/>
				</div>
			</CSSTransition>			
		</button>
	);
}