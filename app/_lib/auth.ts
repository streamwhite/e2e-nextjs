import { getAuth } from 'quick-fire';

const config = {
  projectId: 'e2e-nextjs-1735983960697',
  appId: '1:404354506672:web:b3aa413b3fe8a2ba8a8075',
  storageBucket: 'e2e-nextjs-1735983960697.firebasestorage.app',
  apiKey: 'AIzaSyDN86ljk4mSSY9PZFTiBbfcKVCceVJsmhg',
  authDomain: 'e2e-nextjs-1735983960697.firebaseapp.com',
  messagingSenderId: '404354506672',
};

const auth = getAuth(config);

export { auth };
