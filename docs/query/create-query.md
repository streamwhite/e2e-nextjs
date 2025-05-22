# createQuery

Creates a Firestore query with filters, ordering, and pagination options.

## Import

```typescript
import { createQuery } from 'quick-fire-store';
```

## Syntax

```typescript
const query = createQuery({
  collectionRef,
  compositeFilterConstraint,
  orderByFields,
  limit,
  startAt,
  startAfter,
  endAt,
  endBefore,
});
```

## Parameters

| Parameter                 | Type                                                       | Description                                       |
| ------------------------- | ---------------------------------------------------------- | ------------------------------------------------- |
| collectionRef             | `CollectionReference`                                      | Reference to the collection to query              |
| compositeFilterConstraint | `QueryConstraint`                                          | Combined filter constraints using `and()`         |
| orderByFields             | `{ fieldPath: string; sortDirection?: 'desc' \| 'asc' }[]` | Optional array of fields to order by              |
| limit                     | `number`                                                   | Optional maximum number of documents to return    |
| startAt                   | `QueryConstraint`                                          | Optional starting point for the query             |
| startAfter                | `QueryConstraint`                                          | Optional starting point (exclusive) for the query |
| endAt                     | `QueryConstraint`                                          | Optional ending point for the query               |
| endBefore                 | `QueryConstraint`                                          | Optional ending point (exclusive) for the query   |

## Returns

Returns a Firestore Query object.

## Example

```typescript
import { collection, createQuery, where, and, startAt } from 'quick-fire-store';

// Create filter constraints
const compositeFilterConstraint = and(
  where('qty', '>', 1),
  where('desc', '!=', null),
  where('title', '==', 'custom title')
);

// Define ordering
const orderByFields = [{ fieldPath: 'qty', sortDirection: 'desc' }];

// Define pagination
const limitParam = 10;
const startAtParam = 9;

// Create the query
const query = createQuery({
  collectionRef: collection(db, 'posts'),
  compositeFilterConstraint,
  orderByFields,
  limit: limitParam,
  startAt: startAt(startAtParam),
});
```

## Live Example

You can find a complete working example in our [E2E test repository](https://github.com/YOUR_USERNAME/e2e-nextjs/blob/main/app/store-functions/page.tsx).

## Error Handling

## Notes

- All parameters except collectionRef are optional
- Order matters for orderByFields when using compound queries
- Pagination parameters (startAt, startAfter, endAt, endBefore) are mutually exclusive
- The query is not executed until you call a function like getDocsData
