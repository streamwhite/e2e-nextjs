# and

Combines multiple query constraints into a single composite filter.

## Import

```typescript
import { and } from 'quick-fire-store';
```

## Syntax

```typescript
and(...queryConstraints);
```

## Parameters

| Parameter        | Type                   | Description                                      |
| ---------------- | ---------------------- | ------------------------------------------------ |
| queryConstraints | `...QueryConstraint[]` | One or more query constraints created by where() |

## Returns

Returns a composite QueryConstraint that can be used in createQuery.

## Example

```typescript
import { where, and, createQuery, collection } from 'quick-fire-store';

// Combine multiple conditions
const compositeFilter = and(
  where('qty', '>', 1),
  where('desc', '!=', null),
  where('title', '==', 'custom title')
);

// Use in a query
const query = createQuery({
  collectionRef: collection(db, 'posts'),
  compositeFilterConstraint: compositeFilter,
});
```

## Live Example

You can find a complete working example in our [E2E test repository](https://github.com/YOUR_USERNAME/e2e-nextjs/blob/main/app/store-functions/page.tsx).

## Error Handling

The function will throw an error in the following cases:

- If any of the query constraints are invalid

## Notes

- The order of conditions can affect query performance
- Some combinations of conditions may require composite indexes.
