
function AwsSignInTab() {
	return (
		<AwsAuthenticator
			initialState="signIn"
			socialProviders={['amazon', 'apple', 'facebook', 'google']}
			hideSignUp
		/>
	);
}

export default AwsSignInTab;
