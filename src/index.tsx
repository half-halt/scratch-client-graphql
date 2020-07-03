import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Scratch } from "./scratch";
import { BrowserRouter } from 'react-router-dom';
import './aws';

const Root: React.FC = () => {
	return (
		<BrowserRouter>
			<Scratch />
		</BrowserRouter>
	);
};

ReactDOM.unstable_createRoot(document.querySelector("#root")!).render(<Root />);