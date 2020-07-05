import { useLayoutEffect, useState, useRef, RefObject} from 'react';
import { isNil, forEach, get, isString } from 'lodash';

interface ErrorObject
{
	message?: string;
}

type Errors = Record<string, ErrorObject>;

export interface UseControlValitity 
{
	formRef: RefObject<HTMLFormElement>;
	setErrors(errors: Errors): void;
	clearErrors(): void;
}

/**
 * A hook which sets/clears the custom validation proerty on the form elements
 * this allows the use of the 'valid' selector for styling the contorl, and also
 * pushes the data into the accessibity tree in the browser.
 * 
 * It has been tested with 'react-hook-form' but it does not have dependecies 
 * specific to that library, so it should work anywhere.
 * 
 * Usage:
 * 	 	const  {formRef, setErrors} = useControlValidity();
 * 
 * 		...
 * 
 * 		setErrors(errorsObj);
 * 
 * 		---
 * 
 * 		<form ref={formRef}>
 * 			...
 * 
 */
export const useControlValidity = (): UseControlValitity => 
{
	const formRef = useRef<HTMLFormElement>(null);
	const [errors, setErrors] = useState<Errors|null>(null);

	useLayoutEffect(() => {
		if (isNil(formRef.current))
			return;

		forEach(formRef.current.elements, (element) => {
			if (element.tagName === 'INPUT')
			{
				const input = (element as HTMLInputElement);
				const error = errors ? get(errors, `${input.name}.message`) : '';
				input.setCustomValidity(!isString(error) ? '' : error);
			}
		});

	}, [errors, formRef]);

	return {
		formRef,
		setErrors,
		clearErrors: () => setErrors(null)
	}
}