'use client';
import { MultiFactorResolver, User } from 'firebase/auth';
import {
  getMfaResolver,
  sendMfaPhoneLoginCode,
  signInWithSocialProvider,
  verifyMfaCode,
  watchAuth,
} from 'quick-fire';
import { useEffect, useRef, useState } from 'react';
import { auth } from '../_lib/auth';

export default function SignUp() {
  const [user, setUser] = useState<User | null>(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const currentResolver = useRef<MultiFactorResolver | null>(null);

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

  const handleOtpCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMfaCode(e.target.value);
  };

  const verifyCode = () => {
    if (currentResolver.current) {
      verifyMfaCode({
        verificationCode: mfaCode,
        multiFactorResolver: currentResolver.current,
        type: 'sms',
      }).then((userCredential) => {
        setUser(userCredential?.user as User);
      });
    }
  };

  const handleMfa = ({
    types,
    resolver,
  }: {
    types: string[];
    resolver: MultiFactorResolver;
  }) => {
    currentResolver.current = resolver;
    if (types.length === 1) {
      // send code directly
      if (types[0] === 'sms') {
        sendMfaPhoneLoginCode({
          resolver,
          recaptchaContainerId: 'recaptcha',
          auth,
        }).then(() => {
          setIsCodeSent(true);
        });
      }
    } else if (types.length >= 2) {
      // show options to user to select
      // use same input
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithSocialProvider({ providerName: 'google', auth }).catch(
        (error) => {
          const result = getMfaResolver(error, auth);
          if (result && result.types.length >= 1) {
            handleMfa(result);
          }
        }
      );
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInWithSocialProvider({ providerName: 'github', auth }).catch(
        (error) => {
          const result = getMfaResolver(error, auth);
          if (result && result.types.length >= 1) {
            handleMfa(result);
          }
        }
      );
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
      <button
        onClick={handleGithubSignIn}
        className='px-4 py-2 mb-2 text-white bg-gray-800 rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75'
        data-testid='github-signin'
      >
        Sign in with GitHub
      </button>

      {isCodeSent && (
        <input
          type='text'
          placeholder='Enter OTP Code'
          className='px-4 py-2 mb-2 border rounded-md'
          value={mfaCode}
          onChange={handleOtpCodeChange}
          data-testid='otp-code-input'
        />
      )}
      {isCodeSent && (
        <button
          onClick={verifyCode}
          className='px-4 py-2 mb-2 text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75'
          data-testid='verify-code-button'
        >
          Verify Code
        </button>
      )}

      <div id='recaptcha'></div>
    </div>
  );
}
