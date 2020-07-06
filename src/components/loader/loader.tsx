import React, { CSSProperties } from 'react';
import './loader.scss';
import clsx from 'clsx';
import { ReactComponent as Spinner } from "../../assets/spinner-duotone.svg";

export enum LoaderSize 
{
	Small,
	Medium,
	Large,
}

export type CustomSize = {
	width: CSSProperties['width'],
	height: CSSProperties['height']
}

interface LoaderProps
{
	size?: LoaderSize;
	text?: string;
	customSize?: CustomSize;
}

export const Loader: React.FC<LoaderProps> = ({
	size,
	text,
	customSize
}) => {
	const loaderClass = clsx({
			'loader__spinner': true,
			'loader__spinner--small': (size === LoaderSize.Small),
			'loader__spinner--medium': (size === LoaderSize.Medium),
			'loader__spinner--large': (size === LoaderSize.Large)
		});

	const textClass = clsx({
		'loader__text': true,
		'loader__text--small': (size === LoaderSize.Small),
		'loader__text--medium': (size === LoaderSize.Medium),
		'loader__text--large': (size === LoaderSize.Large)
	})

	return (
		<div className='loader'>
			<Spinner style={customSize ? customSize : {}} className={loaderClass}/>
			{(typeof(text) === 'string') && (text.length  !== 0) &&
				<p className={textClass}>{text}</p>
			}
		</div>
	);
}

Loader.defaultProps = {
	size: LoaderSize.Small
};