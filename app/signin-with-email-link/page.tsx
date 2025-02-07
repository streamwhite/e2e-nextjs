'use client';

import {
  AuthCredential,
  MultiFactorResolver,
  reauthenticateWithCredential,
  User,
  UserCredential,
} from 'firebase/auth';
import {
  getAuthCredential,
  getMfaResolverInfo,
  sendMfaPhoneLoginCode,
  signInWithEmailLink,
  verifyMfaCode,
} from 'quick-fire-auth';
import { useEffect, useRef, useState } from 'react';
import { auth } from '../_lib/auth';

const Page = () => {
  const [userCredential, setUserCredential] = useState<UserCredential | null>(
    null
  );
  const currentResolver = useRef<MultiFactorResolver | null>(null);
  const [isShowMfaCodeInput, setIsShowMfaCodeInput] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
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
          setIsShowMfaCodeInput(true);
        });
      }
    } else if (types.length >= 2) {
    }
  };
  const userCredentialRef = useRef<UserCredential | null>(null);

  useEffect(() => {
    signInWithEmailLink({
      auth,
      url: window.location.href,
    })
      .then((userCredential) => {
        setUserCredential(userCredential);
        userCredentialRef.current = userCredential;
        setTimeout(() => {
          const confs = getAuthCredential({
            provider: 'email-link',
            signInLinkInEmail: window.location.href,
            userCredential: userCredentialRef.current as UserCredential,
            email: userCredential.user.email as string,
          });
          reauthenticateWithCredential(
            userCredentialRef.current?.user as User,
            confs as AuthCredential
          )
            .then(() => {
              // not working, credentialWithLink "Firebase: Error (auth/invalid-action-code)."
              // have to re-auth with another way, since link is already used only can be used once
              // Firebase auth auth/invalid-action-code when using a code twice - Stack Overflow: https://stackoverflow.com/questions/74720362/firebase-auth-auth-invalid-action-code-when-using-a-code-twice
              console.log('User re-authenticated');
            })
            .catch((error) => {
              const resolverInfo = getMfaResolverInfo({
                multiFactorError: error,
                auth,
              });
              if (resolverInfo && resolverInfo.types.length >= 1) {
                handleMfa(resolverInfo);
              }
            });
          // only for quick testing
        }, 0.3 * 60 * 1000 + 1 * 1000);
      })
      .catch((error) => {
        const result = getMfaResolverInfo({
          multiFactorError: error,
          auth,
        });
        if (result && result.types.length >= 1) {
          handleMfa(result);
        }
      });
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      {userCredential?.user && (
        <p
          data-testid='signin-with-link-user-email'
          className='text-lg font-semibold text-green-600'
        >
          {userCredential.user.uid}
        </p>
      )}
      {isShowMfaCodeInput && (
        <input
          type='text'
          placeholder='Enter Code'
          data-testid='mfa-code-input'
          value={mfaCode}
          onChange={(e) => setMfaCode(e.target.value)}
          className='mt-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      )}
      {isShowMfaCodeInput && (
        <button
          onClick={() => {
            if (currentResolver.current) {
              verifyMfaCode({
                verificationCode: mfaCode,
                multiFactorResolver: currentResolver.current,
                type: 'sms',
              }).then((userCredential) => {
                setUserCredential(userCredential as UserCredential);
              });
            }
          }}
          data-testid='verify-mfa-code-button'
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          Verify Code
        </button>
      )}

      <div id='recaptcha' className='mt-4'></div>
    </div>
  );
};

export default Page;
