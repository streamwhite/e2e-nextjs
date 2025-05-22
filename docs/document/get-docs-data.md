# getDocsData

Retrieves data from multiple Firestore documents based on a query.

## Import

```typescript
import { getDocsData } from 'quick-fire-store';
```

## Syntax

```typescript
const data = await getDocsData({
  query,
  isFromCache,
});
```

## Parameters

| Parameter   | Type      | Description                                  |
| ----------- | --------- | -------------------------------------------- |
| query       | `Query`   | Firestore query to execute                   |
| isFromCache | `boolean` | Whether to allow serving the data from cache |

## Returns

Returns a Promise that resolves with an array of document data.

## Example

```typescript
import {
  collection,
  createQuery,
  where,
  and,
  getDocsData,
} from 'quick-fire-store';

// Create a query
const compositeFilterConstraint = and(
  where('qty', '>', 1),
  where('desc', '!=', null),
  where('title', '==', 'custom title')
);

const query = createQuery({
  collectionRef: collection(db, 'posts'),
  compositeFilterConstraint,
});

// Get the documents
const docsData = await getDocsData({
  query,
  isFromCache: false,
});

console.log('Documents data:', docsData);
```

## Live Example

You can find a complete working example in our [E2E test repository](https://github.com/YOUR_USERNAME/e2e-nextjs/blob/main/app/store-functions/page.tsx).

## Error Handling

The function will throw an error in the following cases:

- If the query is invalid
- If you don't have permission to read the documents

## Notes

- Each document in the result includes its data and ID
- Results can be ordered using the query's orderBy clause
- Results can be limited using the query's limit clause
- Setting isFromCache to true can improve performance but may return stale data
