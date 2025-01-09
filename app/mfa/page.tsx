'use client';
import { User } from 'firebase/auth';
import {
  enrollMfaWithPhone,
  sendMfaPhoneEnrollmentCode,
  watchAuth,
} from 'quick-fire';
import { useEffect, useState } from 'react';
import { auth } from '../_lib/auth';

export default function SignUp() {
  const [user, setUser] = useState<User | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const [isEnrollStarted, setIsEnrollStarted] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

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

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const verifyCode = () => {
    enrollMfaWithPhone({
      verificationCode: mfaCode,
      auth,
      user: user!,
    }).then(() => setIsCodeSent(true));
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>this is mfa test page</h1>
      {user && (
        <p
          className='mb-4 text-lg font-semibold text-green-600'
          data-testid='mfa-signed-in'
        >
          {user?.uid}
        </p>
      )}
      {user && (
        <div className='flex flex-col items-center'>
          <button
            onClick={() => setIsEnrollStarted(true)}
            className='mb-4 px-4 py-2 bg-blue-500 text-white rounded'
            data-testid='start-enrollment'
          >
            start enrollment
          </button>
          {isEnrollStarted && (
            <>
              <input
                type='text'
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder='Phone Number'
                className='mb-4 px-4 py-2 border rounded'
                data-testid='mfa-phone-number'
                autoComplete='on'
              />
              {isCodeSent && (
                <input
                  type='text'
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  placeholder='mfa code'
                  className='mb-4 px-4 py-2 border rounded'
                  data-testid='mfa-code'
                />
              )}
              <button
                onClick={() => {
                  sendMfaPhoneEnrollmentCode({
                    phoneNumber: phoneNumber,
                    recaptchaContainerId: 'recaptcha',
                    auth,
                    user,
                  });
                }}
                className='px-4 py-2 bg-green-500 text-white rounded mb-4'
                data-testid='mfa-enroll'
              >
                send enroll code
              </button>
              <button
                onClick={verifyCode}
                className='px-4 py-2 bg-yellow-500 text-white rounded'
                data-testid='verify-enrollment'
              >
                enroll user
              </button>
            </>
          )}
        </div>
      )}
      <div id='recaptcha'></div>
    </div>
  );
}
