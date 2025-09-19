import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useCookieAuth from '@auth/services/cookie/useCookieAuth';

type AuthLoginPayload = {
  email: string;
  password: string;
};

function AuthLoginTab() {
  const { signIn } = useCookieAuth();
  const { register, handleSubmit } = useForm<AuthLoginPayload>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: AuthLoginPayload) => {
    try {
      setLoading(true);
      await signIn?.(data);
    } catch (err) {
      console.error('Login failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      name="loginForm"
      noValidate
      className="flex w-full flex-col justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField {...register('email')} label="Email" className="mb-24" autoFocus type="email" variant="outlined" required fullWidth />
      <TextField {...register('password')} label="Password" type="password" variant="outlined" required fullWidth />
      <Button variant="contained" color="secondary" className="mt-16" aria-label="Sign in" disabled={loading} type="submit" size="large" fullWidth>
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
}

export default AuthLoginTab;