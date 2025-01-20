import { MultiFactorResolver, signOut, User } from 'firebase/auth';
import {
  getMfaResolverInfo,
  sendMfaPhoneLoginCode,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  verifyMfaCode,
  watchAuth,
} from 'quick-fire-auth';
import { useEffect, useRef, useState } from 'react';
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
  const [isShowMfaCodeInput, setIsShowMfaCodeInput] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const currentResolver = useRef<MultiFactorResolver | null>(null);

  useEffect(() => {
    const unsubscribe = watchAuth({
      handleUser: (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      },
      auth,
    });
    return () => unsubscribe();
  }, [setUser]);

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
      // todo: move this to a function handle single mfa
      if (types[0] === 'sms') {
        sendMfaPhoneLoginCode({
          resolver,
          recaptchaContainerId: 'recaptcha',
          auth,
        }).then(() => {
          setIsShowMfaCodeInput(true);
        });
      }
    } else if (types.length >= 2) {
      // show options to user to select
      // use same input
    }
  };

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

      {isShowMfaCodeInput && (
        <input
          type='text'
          placeholder='Enter MFA Code'
          className='px-4 py-2 border rounded-md'
          data-testid='mfa-code-input'
          value={mfaCode}
          onChange={(e) => {
            setMfaCode(e.target.value);
          }}
        />
      )}
      <button
        className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
        onClick={() => {
          signInWithEmailAndPassword(auth, email, password).catch((error) => {
            if (error.code === 'auth/user-not-found') {
              setError('User not found');
            } else {
              setError(error.message);
              const resolverInfo = getMfaResolverInfo({
                multiFactorError: error,
                auth,
              });
              if (resolverInfo && resolverInfo.types.length >= 1) {
                handleMfa(resolverInfo);
              }
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

      {isShowMfaCodeInput && (
        <button
          className='px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600'
          onClick={() => {
            verifyMfaCode({
              verificationCode: mfaCode,
              multiFactorResolver:
                currentResolver.current as MultiFactorResolver,
              type: 'sms',
            }).then((userCredential) => {
              setUser(userCredential?.user as User);
            });
          }}
          data-testid='verify-mfa-code-button'
        >
          Verify MFA Code
        </button>
      )}
      <button
        className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'
        onClick={() => {
          const actionCodeSettings = {
            url: `https://localhost:3000/signin-with-email-link?email=${email}`,
            handleCodeInApp: true,
          };

          sendSignInLinkToEmail({ email, actionCodeSettings, auth });
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
      <div id='recaptcha'></div>
    </div>
  );
}
