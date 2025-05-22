# Quick Fire Store Documentation

This documentation covers the functions available in the `quick-fire-store` library, a wrapper around Firebase Firestore that provides convenient utilities for common database operations.

## Available Functions

### Initialization

- [initializeApp](./initialization/initialize-app.md) - Initialize Firebase app
- [getFirestore](./initialization/get-firestore.md) - Get Firestore instance

### Document Operations

- [createDoc](./document/create-doc.md) - Create a new document
- [updateDoc](./document/update-doc.md) - Update an existing document
- [deleteField](./document/delete-field.md) - Delete a field from a document
- [getDocData](./document/get-doc-data.md) - Get data from a single document
- [getDocsData](./document/get-docs-data.md) - Get data from multiple documents

### Query Operations

- [createQuery](./query/create-query.md) - Create a Firestore query
- [where](./query/where.md) - Create a where clause for queries
- [and](./query/and.md) - Combine multiple where clauses
- [startAt](./query/start-at.md) - Create a startAt cursor

### Aggregation Functions

- [getSumForQuery](./aggregation/get-sum-for-query.md) - Calculate sum for a field
- [getCountForQuery](./aggregation/get-count-for-query.md) - Get count of documents
- [getAverageForQuery](./aggregation/get-average-for-query.md) - Calculate average for a field

### Real-time Updates

- [watchDoc](./realtime/watch-doc.md) - Watch a single document for changes
- [watchDocs](./realtime/watch-docs.md) - Watch multiple documents for changes

## Example Usage

You can find complete examples in our [E2E test repository](https://github.com/YOUR_USERNAME/e2e-nextjs).

## Installation

```bash
npm install quick-fire-store
```

## Contributing

Please read our [contributing guidelines](./CONTRIBUTING.md) before submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

you d onot have to read this doc .
