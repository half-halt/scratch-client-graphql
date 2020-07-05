import React, { cloneElement, isValidElement, Children } from 'react';
import { isString, isEmpty } from 'lodash';
import './form-group.scss';

export interface FormGroupProps
{
	id: string;
	label?: string;
	helpText?: string;
	errorText?: string;
	row?: boolean;
}

export const FormGroup: React.FC<React.PropsWithChildren<FormGroupProps>> = ({
	children,
	label,
	helpText,
	errorText,
	id,
	row
}) => {
	return (
		<div className={row ? 'formgroup formgroup--row' : 'formgroup'}>
			{isString(label) && 
				<label className='formgroup__label' htmlFor={id}>{label}</label>
			}
			{Children.map(children, (child) => {
				if (isValidElement(child))
					return cloneElement(child, { id, name:id } as any);
				return child;
			})}
			{isString(errorText) && !isEmpty(errorText) &&
				<p className='formgroup__error'>{errorText}</p>
			}
			{isString(helpText) && isEmpty(errorText) && !isEmpty(helpText) &&
				<p className='formgroup__help'>{helpText}</p>
			}
		</div>
	)
}