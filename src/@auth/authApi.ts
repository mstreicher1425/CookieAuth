import api from '@/utils/api';
import { User } from '@auth/user';

export type AuthResponse = {
  user: User;
  accessToken?: string;
  refreshToken?: string;
};

export async function authSignIn(credentials: { email: string; password: string }): Promise<AuthResponse> {
  return api.post('auth/login', { json: credentials }).json();
}

export async function authSignUp(data: { displayName: string; email: string; password: string }): Promise<AuthResponse> {
  return api.post('auth/register', { json: data }).json();
}

export async function authLogout(): Promise<Response> {
  return api.post('auth/logout');
}

export async function authRefreshToken(): Promise<Response> {
  return api.post('auth/refresh');
}

export async function authValidate(): Promise<User> {
  return api.get('auth/validate').json();
}

export async function authGetDbUser(userId: string): Promise<User> {
  return api.get(`auth/user/${userId}`).json();
}

export async function authGetDbUserByEmail(email: string): Promise<User> {
  return api.get(`auth/user-by-email/${email}`).json();
}

export function authUpdateDbUser(user: Partial<User>): Promise<Response> {
  return api.put(`auth/user/${user?.id}`, { json: user });
}
