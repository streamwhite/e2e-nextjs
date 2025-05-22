# deleteField

Deletes a field from a Firestore document.

## Import

```typescript
import { deleteField } from 'quick-fire-store';
```

## Syntax

```typescript
await deleteField({
  db,
  docPath,
  field,
});
```

## Parameters

| Parameter | Type        | Description                                                      |
| --------- | ----------- | ---------------------------------------------------------------- |
| db        | `Firestore` | Firestore database instance                                      |
| docPath   | `string`    | Full path to the document (including collection and document ID) |
| field     | `string`    | Name of the field to delete                                      |

## Returns

Returns a Promise that resolves when the field is deleted.

## Example

```typescript
await deleteField({
  db,
  docPath: 'posts/documentId',
  field: 'qty',
});
```

## Live Example

You can find a complete working example in our [E2E test repository](https://github.com/YOUR_USERNAME/e2e-nextjs/blob/main/app/store-functions/page.tsx).

## Error Handling

The function will throw an error in the following cases:

- If the document doesn't exist
- If the field doesn't exist
- If the document path is invalid
- If you don't have permission to delete the field

## Notes

- Deleting a field is different from setting it to null or undefined
- This operation is atomic
