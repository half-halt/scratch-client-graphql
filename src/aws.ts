import { Amplify } from 'aws-amplify';

Amplify.configure({
	Auth:{
		mandatorySignIn: false,
		region: 'us-west-2',
		userPoolId: 'us-west-2_9nfnw7an1',
		userPoolWebClientId: '19l4efp0l6djp844rl04aotm0j',
		identityPoolId: 'tdb'
	},
	Storage:{
		region: 'us-west-2',
		bucket: 'tsnotes-app-upload',
		idenityPoolId: 'tbd'
	}
});