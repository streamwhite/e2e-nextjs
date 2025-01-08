'use client';

import { UserCredential } from 'firebase/auth';
import { signInWithEmailLink } from 'quick-fire';
import { useEffect, useState } from 'react';
import { auth } from '../_lib/auth';

const Page = () => {
  const [userCredential, setUserCredential] = useState<UserCredential | null>(
    null
  );

  useEffect(() => {
    signInWithEmailLink(window.location.href, auth).then((userCredential) => {
      setUserCredential(userCredential);
    });
  }, []);

  return (
    <div>
      {userCredential?.user && (
        <p data-testid='signin-with-link-user-email'>
          {userCredential.user.email}
        </p>
      )}
    </div>
  );
};

export default Page;
