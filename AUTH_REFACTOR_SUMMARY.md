# Auth Refactor Summary

## Updated files:
- src/@auth/Authentication.tsx
- src/@auth/authApi.ts
- src/@auth/services/firebase/FirebaseAuthContext.tsx
- src/@auth/services/jwt/JwtAuthContext.tsx
- src/@auth/services/jwt/JwtAuthProvider.tsx
- src/app/(public)/(auth)/components/tabs/sign-in/AwsSignInTab.tsx
- src/app/(public)/(auth)/components/tabs/sign-in/FirebaseSignInTab.tsx
- src/app/(public)/(auth)/components/tabs/sign-in/JwtSignInTab.tsx
- src/app/(public)/(auth)/components/tabs/sign-up/AuthSignUpTab.tsx
- src/app/(public)/(auth)/components/tabs/sign-up/AwsSignUpTab.tsx
- src/app/(public)/(auth)/components/tabs/sign-up/FirebaseSignUpTab.tsx
- src/app/(public)/(auth)/components/tabs/sign-up/index.ts
- src/app/(public)/(auth)/components/views/SignInPageView.tsx
- src/app/(public)/(auth)/components/views/SignUpPageView.tsx
- src/app/(public)/documentation/components/views/AuthenticationDoc.tsx
- src/utils/api.ts

## Removed mock references in:
- src/app/(public)/documentation/components/views/development/ApiConfigurationDoc.tsx
- src/index.tsx