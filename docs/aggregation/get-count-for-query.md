# getCountForQuery

Counts the number of documents that match a query.

## Import

```typescript
import { getCountForQuery } from 'quick-fire-store';
```

## Syntax

```typescript
const count = await getCountForQuery({
  query,
});
```

## Parameters

| Parameter | Type    | Description                    |
| --------- | ------- | ------------------------------ |
| query     | `Query` | The Firestore query to execute |

## Returns

Returns a Promise that resolves with the number of documents matching the query.

## Example

```typescript
import {
  collection,
  createQuery,
  where,
  and,
  getCountForQuery,
} from 'quick-fire-store';

// Create a query
const query = createQuery({
  collectionRef: collection(db, 'posts'),
  compositeFilterConstraint: and(where('desc', '==', 'desc')),
});

// Get count
const count = await getCountForQuery({ query });

console.log('Number of matching documents:', count);
```

## Live Example

You can find a complete working example in our [E2E test repository](https://github.com/YOUR_USERNAME/e2e-nextjs/blob/main/app/store-functions/page.tsx).

## Error Handling

The function will throw an error in the following cases:

- If the query is invalid
- If you don't have permission to read the documents
- If there's a network error

## Notes

- Returns 0 if no documents match the query
- The operation is performed server-side for better performance
- More efficient than fetching all documents and counting them
