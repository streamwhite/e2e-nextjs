# watchDocs

Sets up a real-time listener for changes to multiple documents matching a query.

## Import

```typescript
import { watchDocs } from 'quick-fire-store';
```

## Syntax

```typescript
watchDocs({
  query,
  includeMetadataChanges,
  source,
  onError,
  onChange,
});
```

## Parameters

| Parameter              | Type                                                                | Description                             |
| ---------------------- | ------------------------------------------------------------------- | --------------------------------------- |
| query                  | `Query`                                                             | The Firestore query to watch            |
| includeMetadataChanges | `boolean`                                                           | Whether to trigger for metadata changes |
| source                 | `'default' \| 'cache' \| 'server'`                                  | Source of the data                      |
| onError                | `(error: Error) => void`                                            | Callback for error handling             |
| onChange               | `(info: { data: any[]; eventSource: 'local' \| 'server' }) => void` | Callback for document changes           |

## Returns

Returns an unsubscribe function that can be called to stop watching the documents.

## Example

```typescript
import {
  collection,
  createQuery,
  where,
  and,
  watchDocs,
} from 'quick-fire-store';

const query = createQuery({
  collectionRef: collection(db, 'posts'),
  compositeFilterConstraint: and(where('desc', '!=', 'desc')),
});

const unsubscribe = watchDocs({
  query,
  includeMetadataChanges: false,
  source: 'default',
  onError: (err) => {
    console.error('Watch error:', err.message);
  },
  onChange: (info) => {
    if (info.eventSource === 'local') {
      console.log('Local changes detected');
    } else {
      console.log('Server changes detected');
    }
    console.log('Documents data:', info.data);
  },
});

// Later, to stop watching:
// unsubscribe();
```

## Live Example

You can find a complete working example in our [E2E test repository](https://github.com/YOUR_USERNAME/e2e-nextjs/blob/main/app/store-functions/page.tsx).

## Error Handling

The function will throw an error in the following cases:

- If the query is invalid
- If you don't have permission to read the documents
- If there's a network error and cache is not available

## Notes

- The listener remains active until unsubscribe is called
- Changes are received in real-time for all matching documents
- Can distinguish between local and server changes
- Metadata changes include document existence and write time
- The source parameter controls where data is read from
- Memory leaks can occur if unsubscribe is not called when done
- The onChange callback receives an array of all matching documents
- Documents that no longer match the query will be removed from the results
