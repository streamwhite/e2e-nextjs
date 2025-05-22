# getDocData

Retrieves data from a single Firestore document.

## Import

```typescript
import { getDocData } from 'quick-fire-store';
```

## Syntax

```typescript
const data = await getDocData({
  documentReference,
  isFromCache,
});
```

## Parameters

| Parameter         | Type                | Description                                  |
| ----------------- | ------------------- | -------------------------------------------- |
| documentReference | `DocumentReference` | Reference to the document to retrieve        |
| isFromCache       | `boolean`           | Whether to allow serving the data from cache |

## Returns

Returns a Promise that resolves with the document data or null if the document doesn't exist.

## Example

```typescript
import { doc, getDocData } from 'quick-fire-store';

const docRef = doc(db, 'posts/documentId');
const docData = await getDocData({
  documentReference: docRef,
  isFromCache: false,
});

if (docData) {
  console.log('Document data:', docData);
} else {
  console.log('Document does not exist');
}
```

## Live Example

You can find a complete working example in our [E2E test repository](https://github.com/YOUR_USERNAME/e2e-nextjs/blob/main/app/store-functions/page.tsx).

## Error Handling

The function will throw an error in the following cases:

- If the document reference is invalid
- If you don't have permission to read the document
- If there's a network error and cache is not allowed

## Notes

- Setting isFromCache to true can improve performance but may return stale data
