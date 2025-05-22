# getSumForQuery

Calculates the sum of a numeric field for all documents matching a query.

## Import

```typescript
import { getSumForQuery } from 'quick-fire-store';
```

## Syntax

```typescript
const sum = await getSumForQuery({
  query,
  field,
});
```

## Parameters

| Parameter | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| query     | `Query`  | The Firestore query to execute |
| field     | `string` | The numeric field to sum       |

## Returns

Returns a Promise that resolves with the sum of the specified field across all matching documents.

## Example

```typescript
import {
  collection,
  createQuery,
  where,
  and,
  getSumForQuery,
} from 'quick-fire-store';

// Create a query
const query = createQuery({
  collectionRef: collection(db, 'posts'),
  compositeFilterConstraint: and(where('desc', '==', 'desc')),
});

// Calculate sum
const result = await getSumForQuery({
  query,
  field: 'qty',
});

console.log('Sum:', result);
```

## Live Example

You can find a complete working example in our [E2E test repository](https://github.com/YOUR_USERNAME/e2e-nextjs/blob/main/app/store-functions/page.tsx).

## Error Handling

The function will throw an error in the following cases:

- If the field is not numeric
- If the query is invalid
- If you don't have permission to read the documents
- If there's a network error

## Notes

- Only works with numeric fields
- The operation is performed server-side for better performance
