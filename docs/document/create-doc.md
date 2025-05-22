# createDoc

Creates a new document in Firestore with the provided data.

## Import

```typescript
import { createDoc } from 'quick-fire-store';
```

## Syntax

```typescript
await createDoc({
  db,
  collectionPath,
  docId,
  documentData,
});
```

## Parameters

| Parameter      | Type                  | Description                                                                       |
| -------------- | --------------------- | --------------------------------------------------------------------------------- |
| db             | `Firestore`           | Firestore database instance                                                       |
| collectionPath | `string`              | Path to the collection where the document will be created                         |
| docId          | `string \| undefined` | Optional custom ID for the document. If not provided, Firestore will generate one |
| documentData   | `object`              | The data to be stored in the document                                             |

## Returns

Returns a Promise that resolves when the document is created.

## Example

```typescript
// Create document with auto-generated ID
await createDoc({
  db,
  collectionPath: 'posts',
  docId: undefined,
  documentData: {
    title: 'random title',
    qty: 5,
    desc: 'this is a random doc',
  },
});

// Create document with custom ID
await createDoc({
  db,
  collectionPath: 'posts',
  docId: 'custom-id-123',
  documentData: {
    title: 'custom title',
    qty: 5,
    desc: 'this is a custom doc',
  },
});
```

## Live Example

You can find a complete working example in our [E2E test repository](https://github.com/YOUR_USERNAME/e2e-nextjs/blob/main/app/store-functions/page.tsx).

## Error Handling

The function will throw an error in the following cases:

- If the document with the specified custom ID already exists
- If the collection path is invalid
- If the document data is invalid

## Notes

- If docId is undefined, Firestore will generate a random ID
- The documentData must be a plain JavaScript object
- Nested objects are supported
- You can include arrays and other Firestore-supported data types in the documentData
