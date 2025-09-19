import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useCookieAuth from '@auth/services/cookie/useCookieAuth';

type AuthSignUpPayload = {
  displayName: string;
  email: string;
  password: string;
};

function AuthSignUpTab() {
  const { signUp } = useCookieAuth();
  const { register, handleSubmit } = useForm<AuthSignUpPayload>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: AuthSignUpPayload) => {
    try {
      setLoading(true);
      await signUp?.(data);
    } catch (err) {
      console.error('Registration failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      name="registerForm"
      noValidate
      className="flex w-full flex-col justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField {...register('displayName')} label="Name" className="mb-24" autoFocus type="text" variant="outlined" required fullWidth />
      <TextField {...register('email')} label="Email" className="mb-24" type="email" variant="outlined" required fullWidth />
      <TextField {...register('password')} label="Password" type="password" variant="outlined" required fullWidth />
      <Button variant="contained" color="secondary" className="mt-16" aria-label="Sign up" disabled={loading} type="submit" size="large" fullWidth>
        {loading ? 'Signing up...' : 'Sign up'}
      </Button>
    </form>
  );
}

export default AuthSignUpTab;