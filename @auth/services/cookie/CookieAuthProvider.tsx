import { useState, useEffect, useCallback, useMemo, useImperativeHandle } from 'react';
import type { FuseAuthProviderComponentProps, FuseAuthProviderState } from '@fuse/core/FuseAuthProvider/types/FuseAuthTypes';
import { authRefreshToken, authSignIn, authSignUp, authUpdateDbUser, authValidate, authLogout } from '@auth/authApi';
import type { User } from '@auth/user';
import CookieAuthContext from './CookieAuthContext';
import { HTTPError } from 'ky';

function CookieAuthProvider(props: FuseAuthProviderComponentProps) {
  const { ref, children, onAuthStateChanged } = props;
  const [authState, setAuthState] = useState<FuseAuthProviderState<User>>({
    authStatus: 'configuring',
    isAuthenticated: false,
    user: null
  });

  useEffect(() => {
    onAuthStateChanged?.(authState);
  }, [authState, onAuthStateChanged]);

  useEffect(() => {
    const run = async () => {
      try {
        const user = await authValidate();
        setAuthState({ authStatus: 'authenticated', isAuthenticated: true, user });
      } catch (e) {
        if (e instanceof HTTPError && e.response.status === 401) {
          try {
            await authRefreshToken();
            const user = await authValidate();
            setAuthState({ authStatus: 'authenticated', isAuthenticated: true, user });
            return;
          } catch {}
        }
        setAuthState({ authStatus: 'unauthenticated', isAuthenticated: false, user: null });
      }
    };
    if (!authState.isAuthenticated) run();
  }, [authState.isAuthenticated]);

  const signIn = useCallback(async (payload: { email: string; password: string }) => {
    const session = await authSignIn(payload);
    setAuthState({ authStatus: 'authenticated', isAuthenticated: true, user: session.user });
    return session;
  }, []);

  const signUp = useCallback(async (payload: { displayName: string; email: string; password: string }) => {
    const session = await authSignUp(payload);
    setAuthState({ authStatus: 'authenticated', isAuthenticated: true, user: session.user });
    return session;
  }, []);

  const signOut = useCallback(async () => {
    try { await authLogout(); } catch {}
    setAuthState({ authStatus: 'unauthenticated', isAuthenticated: false, user: null });
  }, []);

  const updateUser = useCallback(async (user: Partial<User>) => {
    return authUpdateDbUser(user);
  }, []);

  const refreshToken = useCallback(async () => {
    return authRefreshToken();
  }, []);

  useImperativeHandle(ref, () => ({ signOut, updateUser }), [signOut, updateUser]);

  const value = useMemo(() => ({
    ...authState, signIn, signUp, signOut, updateUser, refreshToken
  }), [authState, signIn, signUp, signOut, updateUser, refreshToken]);

  useEffect(() => {
    if (!authState.isAuthenticated) return;
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const res = await originalFetch(...args);
      if (res.status === 401) {
        const url = res.url || (typeof args[0] === 'string' ? args[0] : '');
        if (url.includes('/auth/login') || url.includes('/auth/register')) return res;
        try {
          await authRefreshToken();
          return originalFetch(...args);
        } catch {
          signOut();
        }
      }
      return res;
    };
  }, [authState.isAuthenticated, signOut]);

  return <CookieAuthContext.Provider value={value}>{children}</CookieAuthContext.Provider>;
}

export default CookieAuthProvider;
