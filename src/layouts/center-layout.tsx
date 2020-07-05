import React from 'react';
import './layouts.scss';

/**
 * Implements a simple layout which centers its content on larger screns
 * and pushes it tothe top for small screens.
 */
export const CenterLayout: React.FC<React.PropsWithChildren<{}>> = ({
	children
}) => {
	return (
		<div className='centeredlayout'>
			{children}
		</div>
	);
}
