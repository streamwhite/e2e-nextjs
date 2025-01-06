'use client';
/* const workflow = {
  'create a page component': {
    'a button to send pass word reset email': {
      'clicking the button': {
        'should send an email to the user': 'success',
      },
    },
    'insert testids': {},
    'use tailwindcss to style all with common practice': {},
  },
}; */

import { auth } from '@/app/_lib/auth';
import { confidentials } from '@/tests/auth/constants';
import { sendPasswordResetEmail } from 'quick-fire';
import { useState } from 'react';
const { email } = confidentials.signup;

/* const testworkflow = [
  `sign user in`,
  `go to reset password page`,
  'click button and check email is sent',
  `email language is zh-cn`,
]; */
const ResetPassPage = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const handleSendEmail = () => {
    sendPasswordResetEmail(auth, email, 'fr')
      .then(() => {
        setIsEmailSent(true);
      })
      .catch(() => {
        setIsEmailSent(false);
      });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-2xl font-bold mb-4'>Reset Password</h1>
      <button
        data-testid='send-email-button'
        onClick={handleSendEmail}
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
      >
        Send Password Reset Email
      </button>
      <div className='mt-4 text-lg'>
        {isEmailSent ? (
          <p data-testid='email-sent-message'>Email sent</p>
        ) : (
          'Email not sent'
        )}
      </div>
    </div>
  );
};

export default ResetPassPage;
