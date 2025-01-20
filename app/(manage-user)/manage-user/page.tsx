'use client';

import { auth } from '@/app/_lib/auth';
import { confidentials } from '@/tests/auth/constants';
import { verifyBeforeUpdateEmail } from 'firebase/auth';
import {
  deleteUser,
  sendPasswordResetEmail,
  sendVerificationEmail,
  updateEmail,
  updatePassword,
  watchAuth,
} from 'quick-fire-auth';
import { useEffect, useState } from 'react';

const { email } = confidentials.signin;
const lang = 'zh';

const ResetPassPage = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailUpdated, setIsEmailUpdated] = useState(false);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const [isNewEmailVerificationSent, setNewEmailVerificationSent] =
    useState(false);

  useEffect(() => {
    const unsubscribe = watchAuth((user) => {
      setUser(user || null);
    }, auth);
    return () => unsubscribe();
  }, []);

  const handleSendPasswordResetEmail = () => {
    sendPasswordResetEmail(auth, email, lang).then(() => {
      setIsEmailSent(true);
    });
  };

  const handleSendVerificationEmail = () => {
    sendVerificationEmail(auth.currentUser!, auth, lang).then(() => {
      setIsEmailSent(true);
    });
  };

  const handleVerifyNewEmail = async () => {
    if (auth.currentUser) {
      try {
        // verify and update email at same time
        await verifyBeforeUpdateEmail(auth.currentUser, newEmail);
        setNewEmailVerificationSent(true);
      } catch (error) {
        console.error('Error verifying new email:', error);
      }
    }
  };

  const handleUpdateEmail = async () => {
    // it is deprecated
    if (auth.currentUser) {
      try {
        await updateEmail(auth.currentUser, newEmail);
        setIsEmailUpdated(true);
        await sendVerificationEmail(auth.currentUser, auth, lang);
      } catch (error) {
        console.error('Error updating email:', error);
      }
    }
  };

  const handleUpdatePassword = () => {
    if (auth.currentUser) {
      updatePassword(auth.currentUser, newPassword).then(() => {
        setIsPasswordUpdated(true);
      });
    }
  };
  const handleDeleteUser = () => {
    if (auth.currentUser) {
      deleteUser(auth.currentUser).then(() => {
        setUser(null);
      });
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-2xl font-bold mb-4'>Reset Password</h1>
      {user && (
        <>
          <button
            data-testid='send-email-button'
            onClick={handleSendPasswordResetEmail}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
          >
            Send Password Reset Email
          </button>
          <button
            data-testid='send-verification-email-button'
            onClick={handleSendVerificationEmail}
            className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mt-4'
          >
            Send Email Verification
          </button>
          <div className='mt-4 space-y-4'>
            <input
              type='email'
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder='New Email'
              className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              data-testid='update-email-input'
            />
            <button
              data-testid='verify-new-email-button'
              onClick={handleVerifyNewEmail}
              className='w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500'
            >
              Verify New Email
            </button>
            {isNewEmailVerificationSent && (
              <button
                data-testid='update-email-button'
                onClick={handleUpdateEmail}
                className='w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500'
              >
                Update Email
              </button>
            )}
          </div>
          <div className='mt-4'>
            <input
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder='New Password'
              className='px-4 py-2 border rounded'
              data-testid='update-password-input'
            />
            <button
              data-testid='update-password-button'
              onClick={handleUpdatePassword}
              className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mt-4'
            >
              Update Password
            </button>
          </div>
          <div className='mt-4'>
            <button
              data-testid='delete-user-button'
              onClick={handleDeleteUser}
              className='px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700'
            >
              Delete User
            </button>
          </div>
        </>
      )}
      <div className='mt-4 text-lg'>
        {isEmailSent ? (
          <p data-testid='email-sent-message'>Email sent</p>
        ) : (
          'Email not sent'
        )}
      </div>
      <div className='mt-4 text-lg'>
        {isEmailUpdated ? (
          <p data-testid='email-updated-message'>Email updated</p>
        ) : (
          'Email not updated'
        )}
      </div>
      <div className='mt-4 text-lg'>
        {isPasswordUpdated ? (
          <p data-testid='password-updated-message'>Password updated</p>
        ) : (
          'Password not updated'
        )}
      </div>
      <div className='mt-4 text-lg'>
        {user ? (
          <p data-testid='user-exists-message'>User exists</p>
        ) : (
          'User does not exist'
        )}
      </div>
    </div>
  );
};

export default ResetPassPage;
