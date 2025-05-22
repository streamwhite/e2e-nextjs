# getFirestore

Gets a Firestore instance for the provided Firebase app.

## Import

```typescript
import { getFirestore } from 'quick-fire-store';
```

## Syntax

```typescript
const db = getFirestore(app);
```

## Parameters

| Parameter | Type          | Description                                    |
| --------- | ------------- | ---------------------------------------------- |
| app       | `FirebaseApp` | Firebase app instance created by initializeApp |

## Returns

Returns a Firestore database instance.

## Example

```typescript
import { initializeApp, getFirestore } from 'quick-fire-store';

const app = initializeApp(config);
const db = getFirestore(app);
```

## Live Example

You can find a complete working example in our [E2E test repository](https://github.com/YOUR_USERNAME/e2e-nextjs/blob/main/app/store-functions/page.tsx).

## Notes

- This function should be called after initializing your Firebase app
- You can create multiple Firestore instances if needed.
