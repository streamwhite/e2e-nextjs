# getAverageForQuery

Calculates the average value of a numeric field for all documents matching a query.

## Import

```typescript
import { getAverageForQuery } from 'quick-fire-store';
```

## Syntax

```typescript
const average = await getAverageForQuery({
  query,
  field,
});
```

## Parameters

| Parameter | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| query     | `Query`  | The Firestore query to execute |
| field     | `string` | The numeric field to average   |

## Returns

Returns a Promise that resolves with the average value of the specified field across all matching documents.

## Example

```typescript
import {
  collection,
  createQuery,
  where,
  and,
  getAverageForQuery,
} from 'quick-fire-store';

// Create a query
const query = createQuery({
  collectionRef: collection(db, 'posts'),
  compositeFilterConstraint: and(where('desc', '!=', null)),
});

// Calculate average
const average = await getAverageForQuery({
  query,
  field: 'qty',
});

console.log('Average value:', average);
```

## Live Example

You can find a complete working example in our [E2E test repository](https://github.com/YOUR_USERNAME/e2e-nextjs/blob/main/app/store-functions/page.tsx).

## Error Handling

The function will throw an error in the following cases:

- If the field is not numeric
- If the query is invalid
- If you don't have permission to read the documents
- If there's a network error
- If no documents match the query (division by zero)

## Notes

- Only works with numeric fields
- Returns null if no documents match the query
- Null or undefined values in matching documents are excluded from the calculation
- The operation is performed server-side for better performance
- The result is always a number or null
