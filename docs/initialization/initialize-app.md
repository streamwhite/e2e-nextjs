# initializeApp

Initializes a Firebase application instance with the provided configuration.

## Import

```typescript
import { initializeApp } from 'quick-fire-store';
```

## Syntax

```typescript
const app = initializeApp(config);
```

## Parameters

| Parameter | Type             | Description                                                         |
| --------- | ---------------- | ------------------------------------------------------------------- |
| config    | `FirebaseConfig` | Firebase configuration object containing your project's credentials |

## Returns

Returns a Firebase app instance.

## Example

```typescript
import { initializeApp } from 'quick-fire-store';

const config = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id',
};

const app = initializeApp(config);
```

## Live Example

You can find a complete working example in our [E2E test repository](https://github.com/YOUR_USERNAME/e2e-nextjs/blob/main/app/store-functions/page.tsx).

## Notes

- This function should be called once at the start of your application
- The config object should be kept secure and not exposed in client-side code
- You can use environment variables to store your Firebase configuration
