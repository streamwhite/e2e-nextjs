# watchDoc

Sets up a real-time listener for changes to a single document.

## Import

```typescript
import { watchDoc } from 'quick-fire-store';
```

## Syntax

```typescript
watchDoc({
  documentRef,
  includeMetadataChanges,
  source,
  onError,
  onChange,
});
```

## Parameters

| Parameter              | Type                                                              | Description                             |
| ---------------------- | ----------------------------------------------------------------- | --------------------------------------- |
| documentRef            | `DocumentReference`                                               | Reference to the document to watch      |
| includeMetadataChanges | `boolean`                                                         | Whether to trigger for metadata changes |
| source                 | `'default' \| 'cache' \| 'server'`                                | Source of the data                      |
| onError                | `(error: Error) => void`                                          | Callback for error handling             |
| onChange               | `(info: { data: any; eventSource: 'local' \| 'server' }) => void` | Callback for document changes           |

## Returns

Returns an unsubscribe function that can be called to stop watching the document.

## Example

```typescript
import { doc, watchDoc } from 'quick-fire-store';

const docRef = doc(db, 'posts/documentId');

const unsubscribe = watchDoc({
  documentRef: docRef,
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
    console.log('Document data:', info.data);
  },
});

// Later, to stop watching:
// unsubscribe();
```

## Live Example

You can find a complete working example in our [E2E test repository](https://github.com/YOUR_USERNAME/e2e-nextjs/blob/main/app/store-functions/page.tsx).

## Error Handling

## Notes

- The listener remains active until unsubscribe is called
- Changes are received in real-time
- Memory leaks can occur if unsubscribe is not called when done
