import { User } from 'firebase/auth';
import { signUpWithEmailAndPassword, watchAuth } from 'quick-fire-auth';
import { useEffect, useState } from 'react';
import { auth } from '../_lib/auth';

interface SignUpFormProps {
  user: User | null;
  setUser: (user: User | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export default function SignUpForm({
  user,
  setUser,
  error,
  setError,
}: SignUpFormProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    const unsubscribe = watchAuth((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    }, auth);
    return () => unsubscribe();
  }, [setUser]);

  return (
    <div className='signup flex flex-col space-y-4'>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='px-4 py-2 border rounded-md'
        data-testid='email-input'
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='px-4 py-2 border rounded-md'
        data-testid='password-input'
      />
      <button
        className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
        onClick={() => {
          signUpWithEmailAndPassword({
            email,
            password,
            auth,
            hasPassWordPolicyEnabled: false,
          }).catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              setError('User already exists');
            } else {
              setError(error.message);
            }
          });
        }}
        data-testid='sign-up'
      >
        Sign Up
      </button>
      <div>
        {user && (
          <div>
            <p data-testid='signed-in'>{(user as User)?.uid}</p>
          </div>
        )}
      </div>
      <div>
        {error && (
          <div>
            <p data-testid='existed-user'>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
