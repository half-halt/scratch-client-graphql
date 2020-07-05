import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Scratch } from "./scratch";
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { configureAmplify } from './aws';
import { setInitialTheme } from "./hooks/use-theme";
import { Loader, LoaderSize } from "./components/";

configureAmplify();
setInitialTheme();

/**
 * The is the fallback used for the root suspense, it's used while our 
 * lazy components are loaded or we are awaiting for the aync 'initialization' 
 * tp take place.
 */
const RootLoader: React.FC = () => {
	return (
		<div className='rootloader'>
			<Loader size={LoaderSize.Large}/>
		</div>
	);
}

/**
 * The root compoenent for our applicaiton, this sets up the wrapper
 * components and then creates our main application.
 */
const Root: React.FC = () => {
	return (
		<BrowserRouter>
			<RecoilRoot>
				<Suspense fallback={<RootLoader/>}>
					<Scratch/>
				</Suspense>
			</RecoilRoot>
		</BrowserRouter>
	);
};

ReactDOM.unstable_createRoot(document.querySelector("#root")!).render(<Root />);