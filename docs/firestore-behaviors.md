# Firestore Noteworthily Default Behaviors

Important default behaviors in Firestore that are easy to overlook. All information is sourced from the [official Firestore documentation](https://firebase.google.com/docs/firestore).

## Query Behaviors

1. **Missing Fields in Queries**

   - Documents without the queried field are not included in query results
   - Example: Query `where("age", ">", 21)` will not return documents that don't have an `age` field
   - Source: [Query Limitations](https://firebase.google.com/docs/firestore/query-data/queries#limitations)

2. **Null Values in Queries**

   - `null` values are treated differently from missing fields
   - A query `where("age", "==", null)` will only match documents where `age` is explicitly set to `null`
   - Source: [Simple Queries](https://firebase.google.com/docs/firestore/query-data/queries)

3. **Array Queries**
   - `array-contains` only matches exact array elements,If the array has multiple instances of the value you query on, the document is included in the results only once.
   - `array-contains-any` is limited to 10 values
   - Cannot combine `array-contains` with `array-contains-any` in the same query
   - Source: [Array membership](https://firebase.google.com/docs/firestore/query-data/queries#array_membership)

## Document Behaviors

1. **Document Size**

   - Maximum document size is 1 MiB (1,048,576 bytes)
   - Size includes field names, values, and any nested objects
   - Source: [Quotas and Limits](https://firebase.google.com/docs/firestore/quotas#documents)

2. **Field Names**

   - Cannot contain forward slashes (/)
   - Cannot start with a period (.)
   - Cannot contain the sequence ".."
   - Source: [Document Data](https://firebase.google.com/docs/firestore/manage-data/data-types)

3. **Empty Fields**
   - Empty strings are allowed
   - Empty arrays are allowed
   - Empty maps are allowed
   - Source: [Data Types](https://firebase.google.com/docs/firestore/manage-data/data-types)

## Update Behaviors

1. **Field Deletion**

   - Deleting a field is different from setting it to `null`
   - Deleted fields don't appear in query results
   - `null` fields do appear in query results
   - Source: [Delete Data](https://firebase.google.com/docs/firestore/manage-data/delete-data)

2. **Array Updates**

   - `arrayUnion()` only adds elements not already present
   - `arrayRemove()` removes all instances of each element
   - Maximum array size is 20,000 elements
   - Source: [Update Arrays](https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array)

3. **Timestamp Behavior**
   - `serverTimestamp()` returns null in local snapshots until server response
   - Timestamps are always stored with microsecond precision
   - Source: [Data Types](https://firebase.google.com/docs/firestore/manage-data/data-types#timestamps)

## Real-time Updates

1. **Snapshot Behaviors**

   - Local changes appear in snapshots before server confirmation
   - `hasPendingWrites` indicates local-only changes
   - Source: [Listen to Real-time Updates](https://firebase.google.com/docs/firestore/query-data/listen)

2. **Offline Behavior**
   - Cached query results return automatically when offline
   - Writes are queued until reconnection
   - Maximum offline queue size is 100MB
   - Source: [Enable Offline Data](https://firebase.google.com/docs/firestore/manage-data/enable-offline)

## Index Behaviors

1. **Automatic Indexes**

   - Single-field indexes are created automatically
   - Composite indexes must be created manually
   - Cannot query on fields not indexed
   - Source: [Index Types](https://firebase.google.com/docs/firestore/query-data/index-overview#index_types)

2. **Index Limitations**
   - Cannot create indexes on arrays
   - Cannot index geographic points
   - Maximum 200 composite indexes per database
   - Source: [Index Limitations](https://firebase.google.com/docs/firestore/query-data/index-overview#index_limitations)

## Security Rules

1. **Default Behavior**

   - Default rules deny all reads and writes
   - Rules cannot filter documents (use queries instead)
   - Rules are applied after indexes
   - Source: [Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

2. **Rule Evaluation**
   - Rules are evaluated in order
   - First matching rule wins
   - No rules matching means denied
   - Source: [Security Rules Structure](https://firebase.google.com/docs/firestore/security/rules-structure)

## Transaction Behaviors

1. **Transaction Limitations**

   - Must read before write in transactions
   - Maximum 500 documents per transaction
   - Cannot read after first write
   - Source: [Transactions](https://firebase.google.com/docs/firestore/manage-data/transactions)

2. **Batch Write Behaviors**
   - Maximum 500 operations per batch
   - All operations succeed or all fail
   - Cannot read in a batch
   - Source: [Batch Write](https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes)
