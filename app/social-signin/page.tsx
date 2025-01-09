'use client';
import { User } from 'firebase/auth';
import { signInWithSocialProvider, watchAuth } from 'quick-fire';
import { useEffect, useState } from 'react';
import { auth } from '../_lib/auth';

export default function SignUp() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = watchAuth((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    }, auth);
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithSocialProvider({ providerName: 'google', auth });
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  /* const handleAppleSignIn = async () => {
    try {
      await signInWithSocialProvider({ providerName: 'apple', auth });
    } catch (error) {
      console.error('Apple sign-in error:', error);
    }
  }; */

  const handleGithubSignIn = async () => {
    try {
      await signInWithSocialProvider({ providerName: 'github', auth });
    } catch (error) {
      console.error('GitHub sign-in error:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      {user && (
        <p
          className='mb-4 text-lg font-semibold text-green-600'
          data-testid='social-signed-in'
        >
          {user?.uid}
        </p>
      )}
      <button
        onClick={handleGoogleSignIn}
        className='px-4 py-2 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
        data-testid='google-signin'
      >
        Sign in with Google
      </button>
      {/* <button
        onClick={handleAppleSignIn}
        className='px-4 py-2 text-white bg-black rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-75'
        data-testid='apple-signin'
      >
        Sign in with Apple
      </button> */}
      <button
        onClick={handleGithubSignIn}
        className='px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-75'
        data-testid='github-signin'
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
