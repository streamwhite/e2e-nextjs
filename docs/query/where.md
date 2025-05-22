# where

Creates a filter constraint for Firestore queries.

## Import

```typescript
import { where } from 'quick-fire-store';
```

## Syntax

```typescript
where(fieldPath, opStr, value);
```

## Parameters

| Parameter | Type            | Description                   |
| --------- | --------------- | ----------------------------- |
| fieldPath | `string`        | The field to filter on        |
| opStr     | `WhereFilterOp` | The filter operation to apply |
| value     | `any`           | The value to compare against  |

### Available Operations (WhereFilterOp)

- `==` - Equal to
- `!=` - Not equal to
- `<` - Less than
- `<=` - Less than or equal to
- `>` - Greater than
- `>=` - Greater than or equal to
- `array-contains` - Array contains value
- `array-contains-any` - Array contains any of the values
- `in` - Value is in array
- `not-in` - Value is not in array

## Returns

Returns a QueryConstraint that can be used in createQuery.

## Example

```typescript
import { where, and, createQuery, collection } from 'quick-fire-store';

// Single condition
const singleFilter = where('qty', '>', 5);

// Multiple conditions combined with and()
const compositeFilter = and(
  where('qty', '>', 1),
  where('desc', '!=', null),
  where('title', '==', 'custom title')
);

const query = createQuery({
  collectionRef: collection(db, 'posts'),
  compositeFilterConstraint: compositeFilter,
});
```

## Live Example

You can find a complete working example in our [E2E test repository](https://github.com/YOUR_USERNAME/e2e-nextjs/blob/main/app/store-functions/page.tsx).

## Error Handling

## Notes

- Field paths can include nested fields using dot notation (e.g., 'user.name')
