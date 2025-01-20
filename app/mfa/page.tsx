'use client';
import { TotpSecret, User } from 'firebase/auth';
import QRCode from 'qrcode';
import {
  enrollMfaWithPhone,
  enrollWfaWithTotp,
  generateTotpSecret,
  sendMfaPhoneEnrollmentCode,
  watchAuth,
} from 'quick-fire-auth';
import { useEffect, useRef, useState } from 'react';
import { auth } from '../_lib/auth';

export default function SignUp() {
  const [user, setUser] = useState<User | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  // phone number
  const [isEnrollStarted, setIsEnrollStarted] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  // totp
  const [isTotpEnrollStarted, setIsTotpEnrollStarted] = useState(false);

  // ref to secret
  const secretRef = useRef<TotpSecret | null>(null);
  const [totpCode, setTotpCode] = useState('');

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
  }, []);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const verifyCode = () => {
    enrollMfaWithPhone({
      verificationCode: mfaCode,
      user: user!,
    }).then(() => setIsEnrolled(true));
  };

  const handleUri = async (uri: string) => {
    const qrcode = document.getElementById('qrcode');
    try {
      await QRCode.toCanvas(qrcode, uri);
    } catch (error) {
      console.error(error);
    }
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
                  }).then(() => setIsCodeSent(true));
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
              {isEnrolled && (
                <p
                  className='text-green-600 text-lg font-semibold'
                  data-testid='mfa-enrolled'
                >
                  user enrolled
                </p>
              )}
            </>
          )}

          <button
            onClick={() => setIsTotpEnrollStarted(true)}
            className='px-4 py-2 bg-blue-500 text-white rounded mb-2'
            data-testid='start-totp-enrollment'
          >
            start totp enrollment
          </button>
          {isTotpEnrollStarted && (
            <button
              onClick={() => {
                generateTotpSecret({ user, youAppName: 'e2e-nextjs' }).then(
                  (secretInfo) => {
                    const { qrCodeUri, secret } = secretInfo;
                    secretRef.current = secret;
                    handleUri(qrCodeUri);
                  }
                );
              }}
              className='px-4 py-2 bg-green-500 text-white rounded'
              data-testid='totp-enroll'
            >
              get qr code
            </button>
          )}
          <canvas id='qrcode'></canvas>
          {isTotpEnrollStarted && (
            <div>
              <input
                type='text'
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value)}
                placeholder='totp code'
                className='mb-4 px-4 py-2 border rounded'
                data-testid='totp-enroll-code'
              />
              <button
                onClick={() => {
                  enrollWfaWithTotp({
                    user,
                    secret: secretRef.current!,
                    verificationCode: totpCode,
                  }).then(() => setIsEnrolled(true));
                }}
                className='px-4 py-2 bg-yellow-500 text-white rounded'
                data-testid='verify-mfa-code-button'
              >
                enroll user
              </button>
            </div>
          )}
        </div>
      )}

      <div id='recaptcha'></div>
    </div>
  );
}
