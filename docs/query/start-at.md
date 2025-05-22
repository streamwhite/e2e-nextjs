# startAt

Creates a query constraint that defines the starting point of a query.

## Import

```typescript
import { startAt } from 'quick-fire-store';
```

## Syntax

```typescript
startAt(value);
```

## Parameters

| Parameter | Type  | Description           |
| --------- | ----- | --------------------- |
| value     | `any` | The value to start at |

## Returns

Returns a QueryConstraint that can be used in createQuery for pagination.

## Example

```typescript
import { collection, createQuery, where, and, startAt } from 'quick-fire-store';

// Create a query with pagination
const query = createQuery({
  collectionRef: collection(db, 'posts'),
  compositeFilterConstraint: and(where('qty', '>', 1)),
  orderByFields: [{ fieldPath: 'qty', sortDirection: 'desc' }],
  limit: 10,
  startAt: startAt(9),
});
```

## Live Example

You can find a complete working example in our [E2E test repository](https://github.com/YOUR_USERNAME/e2e-nextjs/blob/main/app/store-functions/page.tsx).

## Error Handling

## Notes

- The value must match the type of the ordered field
- Creates an inclusive starting boundary
- Can be used for cursor-based pagination
