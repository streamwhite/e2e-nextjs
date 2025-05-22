# updateDoc

Updates a field in an existing Firestore document with various update operations.

## Import

```typescript
import { updateDoc } from 'quick-fire-store';
```

## Syntax

```typescript
await updateDoc({
  db,
  collectionPath,
  docId,
  fieldPath,
  updateValue,
});
```

## Parameters

| Parameter      | Type          | Description                                    |
| -------------- | ------------- | ---------------------------------------------- |
| db             | `Firestore`   | Firestore database instance                    |
| collectionPath | `string`      | Path to the collection containing the document |
| docId          | `string`      | ID of the document to update                   |
| fieldPath      | `string`      | Path to the field to update                    |
| updateValue    | `UpdateValue` | Update operation configuration                 |

### UpdateValue Types

```typescript
type UpdateValue = {
  operationType:
    | 'updateFieldWithPrimitive'
    | 'arrayUnion'
    | 'arrayRemove'
    | 'increment';
  value: any;
};
```

## Returns

Returns a Promise that resolves when the update is complete.

## Examples

```typescript
// Update a simple field
await updateDoc({
  db,
  collectionPath: 'posts',
  docId: 'documentId',
  fieldPath: 'qty',
  updateValue: {
    operationType: 'updateFieldWithPrimitive',
    value: 10,
  },
});

// Array union operation
await updateDoc({
  db,
  collectionPath: 'posts',
  docId: 'documentId',
  fieldPath: 'tags',
  updateValue: {
    operationType: 'arrayUnion',
    value: ['newTag', 'another tag'],
  },
});

// Array remove operation
await updateDoc({
  db,
  collectionPath: 'posts',
  docId: 'documentId',
  fieldPath: 'tags',
  updateValue: {
    operationType: 'arrayRemove',
    value: ['tagToRemove'],
  },
});

// Increment operation
await updateDoc({
  db,
  collectionPath: 'posts',
  docId: 'documentId',
  fieldPath: 'qty',
  updateValue: {
    operationType: 'increment',
    value: 1,
  },
});
```

## Live Example

You can find a complete working example in our [E2E test repository](https://github.com/YOUR_USERNAME/e2e-nextjs/blob/main/app/store-functions/page.tsx).

## Operation Types

1. **updateFieldWithPrimitive**: Updates a field with a new primitive value
2. **arrayUnion**: Adds elements to an array of a filed.
3. **arrayRemove**: Removes elements from an array of a field.
4. **increment**: Increments a numeric field by the specified amount

## Error Handling

The function will throw an error in the following cases:

- If the document doesn't exist
- If the field path is invalid
- If the value is invalid for the operation type

## Notes
