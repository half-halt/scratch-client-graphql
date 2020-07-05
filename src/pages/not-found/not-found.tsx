import React from 'react';
import { useLocation } from 'react-router-dom';
import './not-found.scss';
import { CenterLayout } from '../../layouts';

export const NotFound: React.FC = () => {
	const { pathname } = useLocation();

	return (
		<CenterLayout>
			<div className="notfound__block">
				<h3>Page Not Found</h3>
				<p>We are sorry the page <em>'{pathname}'</em> does not exist</p>
			</div>
		</CenterLayout>
	);
}