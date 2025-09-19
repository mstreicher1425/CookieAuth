import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import _ from 'lodash';
import { lighten } from '@mui/material/styles';
import AuthLoginTab from '../tabs/sign-in/JwtSignInTab';
import FirebaseSignInTab from '../tabs/sign-in/FirebaseSignInTab';
import AwsSignInTab from '../tabs/sign-in/AwsSignInTab';
import SignInPageTitle from '../ui/SignInPageTitle';
import AuthPagesMessageSection from '../ui/AuthPagesMessageSection';

const tabs = [
	{
		id: 'jwt',
		title: 'JWT',
		logo: '/assets/images/logo/jwt.svg',
		logoClass: 'h-9 p-1 bg-black rounded-lg'
	},
	{
		id: 'firebase',
		title: 'Firebase',
		logo: '/assets/images/logo/firebase.svg',
		logoClass: 'h-9'
	},
	{
		id: 'aws',
		title: 'AWS',
		logo: '/assets/images/logo/aws-amplify.svg',
		logoClass: 'h-9'
	}
];

/**
 * The sign in page.
 */
function SignInPageView() {
	const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

	function handleSelectTab(id: string) {
		setSelectedTabId(id);
	}

	return (
		<div className="flex min-w-0 flex-auto flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start">
			<Paper className="h-full w-full px-4 py-2 sm:h-auto sm:w-auto sm:rounded-xl sm:p-12 sm:shadow-sm md:flex md:h-full md:w-1/2 md:items-center md:justify-end md:rounded-none md:p-16 md:shadow-none ltr:border-r-1 rtl:border-l-1">
				<div className="mx-auto flex w-full max-w-80 flex-col gap-8 sm:mx-0 sm:w-80">
					<SignInPageTitle />
					<div>
						<Tabs
							value={_.findIndex(tabs, { id: selectedTabId })}
							variant="fullWidth"
							className="mb-8 w-full"
							classes={{
								indicator: 'flex justify-center bg-transparent w-full h-full'
							}}
							TabIndicatorProps={{
								children: (
									<Box
										sx={{ borderColor: (theme) => theme.vars.palette.secondary.main }}
										className="h-full w-full rounded-lg border-1 border-solid"
									/>
								)
							}}
						>
							{tabs.map((item) => (
								<Tab
									disableRipple
									onClick={() => handleSelectTab(item.id)}
									key={item.id}
									icon={
										<img
											className={item.logoClass}
											src={item.logo}
											alt={item.title}
										/>
									}
									className="min-w-0"
									label={item.title}
								/>
							))}
						</Tabs>

						{selectedTabId === 'jwt' && <AuthLoginTab />}
						{selectedTabId === 'firebase' && <FirebaseSignInTab />}
						{selectedTabId === 'aws' && <AwsSignInTab />}
					</div>

					<Box
						className="text-md rounded-lg px-4 py-2 leading-[1.625]"
						sx={{
							backgroundColor: (theme) => lighten(theme.palette.primary.main, 0.8),
							color: 'primary.dark'
						}}
					>
						You are browsing <b>Fuse React Demo</b>. Click on the "Sign in" button to access the Demo and
						Documentation.
					</Box>
				</div>
			</Paper>

			<AuthPagesMessageSection />
		</div>
	);
}

export default SignInPageView;
