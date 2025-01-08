import { User, signOut } from 'firebase/auth';
import {
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  watchAuth,
} from 'quick-fire';
import { useEffect, useState } from 'react';
import { auth } from '../_lib/auth';

interface SignInFormProps {
  user: User | null;
  setUser: (user: User | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export default function SignInForm({
  user,
  setUser,
  error,
  setError,
}: SignInFormProps) {
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
    <div className='signin flex flex-col space-y-4'>
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
          signInWithEmailAndPassword(auth, email, password).catch((error) => {
            if (error.code === 'auth/user-not-found') {
              setError('User not found');
            } else {
              setError(error.message);
            }
          });
        }}
        data-testid='sign-in'
      >
        Sign In
      </button>
      <button
        className={`px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ${
          !user ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => {
          signOut(auth)
            .then(() => {
              setUser(null);
            })
            .catch((error) => {
              setError(error.message);
            });
        }}
        disabled={!user}
        data-testid='sign-out'
      >
        Sign Out
      </button>

      <button
        className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'
        onClick={() => {
          const actionCodeSettings = {
            url: `https://localhost:3000/signin-with-email-link?email=${email}`,
            handleCodeInApp: true,
          };

          sendSignInLinkToEmail(email, actionCodeSettings, auth);
        }}
        data-testid='send-signin-link-button'
      >
        Send Email Link
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
            <p data-testid='sign-in-error'>{error}</p>
          </div>
        )}
      </div>
      <div>
        {error && (
          <div>
            <p data-testid='sign-out-error'>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
