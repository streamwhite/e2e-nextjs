# Common Firestore built-in Functions Reference

A quick reference guide for commonly used functions from the Firebase/Firestore JavaScript SDK.

Note: When using Next.js, you need to import these functions from the 'quick-fire-store' package to avoid type mismatch errors like: `Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?`

## Initialization

| Function                                   | Description                                |
| ------------------------------------------ | ------------------------------------------ |
| `initializeApp(config)`                    | Initialize Firebase app with configuration |
| `getFirestore()`                           | Get Firestore instance                     |
| `connectFirestoreEmulator(db, host, port)` | Connect to Firestore emulator              |

## Document Operations

| Function               | Description                |
| ---------------------- | -------------------------- |
| `doc(db, path)`        | Get a document reference   |
| `collection(db, path)` | Get a collection reference |
| `deleteDoc(docRef)`    | Delete a document          |

## Query Building

| Function                         | Description                |
| -------------------------------- | -------------------------- |
| `where(fieldPath, opStr, value)` | Create a filter            |
| `startAt(snapshot)`              | Start query at document    |
| `startAfter(snapshot)`           | Start query after document |
| `endAt(snapshot)`                | End query at document      |
| `endBefore(snapshot)`            | End query before document  |

## Field Values

| Function            | Description        |
| ------------------- | ------------------ |
| `serverTimestamp()` | Server's timestamp |
