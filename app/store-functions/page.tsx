'use client';
import {
  and,
  collection,
  createDoc,
  createQuery,
  deleteField,
  doc,
  getAverageForQuery,
  getCountForQuery,
  getDocData,
  getDocsData,
  getFirestore,
  getSumForQuery,
  initializeApp,
  startAt,
  updateDoc,
  watchDoc,
  watchDocs,
  where,
} from 'quick-fire-store';
import { useState } from 'react';
import { config } from '../_lib/config';

const app = initializeApp(config);
const db = getFirestore(app);

const FirestoreFunctionsPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [qty, setQty] = useState<number | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [average, setAverage] = useState<number | null>(null);
  const [isDocCreated, setIsDocCreated] = useState(false);
  const [isFieldDeleted, setIsFieldDeleted] = useState(false);
  const [isDocExisted, setIsDocExisted] = useState(false); // New state
  const [isDocWithCustomIdCreated, setIsDocWithCustomIdCreated] =
    useState(false); // New state
  interface PostData {
    title: string;
    qty: number;
    desc: string;
  }

  const [docData, setDocData] = useState<PostData | null>(null);

  const [docsData, setDocsData] = useState<object | null>(null);
  const [isDocUpdated, setIsDocUpdated] = useState(false);
  const [currentDocData, setCurrentDocData] = useState<unknown | null>(null);
  const [currentDocsData, setCurrentDocsData] = useState<unknown | null>(null);
  const [queryDocsData, setQueryDocsData] = useState<object | null>(null);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>
        Store Lib Functions E2E Testing
      </h1>
      <div className='space-x-2 mb-4'>
        <div>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            data-testid='get-sum'
            onClick={async () => {
              try {
                setLoading(true);
                setError(null);

                const compositeFilterConstraint = and(
                  where('desc', '==', 'desc')
                );
                const query = createQuery({
                  collectionRef: collection(db, 'posts'),
                  compositeFilterConstraint,
                });
                const result = await getSumForQuery({
                  query,
                  field: 'qty',
                });
                setQty(result);
              } catch (err) {
                setError((err as Error).message);
              } finally {
                setLoading(false);
              }
            }}
          >
            Get Sum for Query
          </button>
          {qty !== null && (
            <p className='text-green-500' data-testid='sum-result'>
              {qty}
            </p>
          )}
        </div>
        <div>
          <button
            className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
            data-testid='get-count'
            onClick={async () => {
              try {
                setLoading(true);
                setError(null);

                const compositeFilterConstraint = and(
                  where('desc', '==', 'desc')
                );
                const query = createQuery({
                  collectionRef: collection(db, 'posts'),
                  compositeFilterConstraint,
                });
                const count = await getCountForQuery({ query });

                setCount(count);
              } catch (err) {
                setError((err as Error).message);
              } finally {
                setLoading(false);
              }
            }}
          >
            Get Count for Query
          </button>
          {count !== null && (
            <p className='text-green-500' data-testid='count-result'>
              {count}
            </p>
          )}
        </div>
        <div>
          <button
            className='px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600'
            data-testid='get-average'
            onClick={async () => {
              try {
                setLoading(true);
                setError(null);

                const compositeFilterConstraint = and(
                  where('desc', '!=', null)
                );
                const query = createQuery({
                  collectionRef: collection(db, 'posts'),
                  compositeFilterConstraint,
                });
                const average = await getAverageForQuery({
                  query,
                  field: 'qty',
                });

                setAverage(average);
              } catch (err) {
                setError((err as Error).message);
              } finally {
                setLoading(false);
              }
            }}
          >
            Get Average for Query
          </button>
          {average !== null && (
            <p className='text-green-500' data-testid='average-result'>
              {average}
            </p>
          )}
        </div>
      </div>
      <div>
        <div>
          <button
            className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600'
            data-testid='create-doc'
            onClick={async () => {
              try {
                setLoading(true);
                setError(null);
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
                setIsDocCreated(true);
              } catch (err) {
                setError((err as Error).message);
              } finally {
                setLoading(false);
              }
            }}
          >
            Create Document with random Id
          </button>
          <div>
            <button
              className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
              data-testid='create-doc-custom-id'
              onClick={async () => {
                try {
                  setLoading(true);
                  setError(null);

                  const customDocId = prompt('Enter custom document ID:');
                  if (!customDocId) {
                    setError('Document ID is required.');
                    return;
                  }
                  await createDoc({
                    db,
                    collectionPath: 'posts',
                    docId: customDocId,
                    documentData: {
                      title: 'custom title',
                      qty: 5,
                      desc: 'this is a custom doc',
                    },
                  });
                  setIsDocWithCustomIdCreated(true);
                } catch (err) {
                  setError((err as Error).message);
                } finally {
                  setLoading(false);
                }
              }}
            >
              Create Document with Custom ID
            </button>
            {isDocWithCustomIdCreated && (
              <p
                data-testid='create-doc-custom-id-result'
                className='text-green-500'
              >
                Document with custom ID created successfully!
              </p>
            )}
          </div>
          <div>
            <button
              className='px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800'
              data-testid='check-doc-exists'
              onClick={async () => {
                try {
                  setLoading(true);
                  setError(null);
                  const existingDocId = prompt(
                    'Enter existed document ID to check:'
                  );
                  if (!existingDocId) {
                    setError('Document ID is required.');
                    return;
                  }
                  await createDoc({
                    db,
                    collectionPath: 'posts',
                    docId: existingDocId,
                    documentData: {
                      title: 'existed doc Title',
                      qty: 0,
                      desc: 'this is an existed doc',
                    },
                  });
                } catch (err) {
                  setError((err as Error).message);
                  setIsDocExisted(true);
                } finally {
                  setLoading(false);
                }
              }}
            >
              Create Document with Existed ID
            </button>
          </div>
          {isDocExisted && (
            <p data-testid='create-doc-existed-result' className='text-red-500'>
              Document with this ID already exists!
            </p>
          )}
        </div>
        <div>
          <button
            className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
            data-testid='create-doc-fail'
            onClick={async () => {
              try {
                setLoading(true);
                setError(null);
                await createDoc({
                  db,
                  collectionPath: 'invalid-collection',
                  docId: undefined,
                  documentData: {
                    title: 'invalid',
                    qty: 0,
                    desc: 'this should fail',
                  },
                });
              } catch (err) {
                setError((err as Error).message);
                setIsDocCreated(false);
              } finally {
                setLoading(false);
              }
            }}
          >
            Test Create Document Failure
          </button>
          {!isDocCreated && error && (
            <p className='text-red-500' data-testid='create-doc-fail-result'>
              Failed to create document
            </p>
          )}
        </div>
        <div>
          <button
            className='px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600'
            data-testid='delete-field'
            onClick={async () => {
              try {
                setLoading(true);
                setError(null);
                await deleteField({
                  /* db, 'posts/fV2R5FLNQOGPAEGY08Js', 'qty'
                   */
                  db,
                  docPath: 'posts/fV2R5FLNQOGPAEGY08Js',
                  field: 'qty',
                });
                setIsFieldDeleted(true);
              } catch (err) {
                setError((err as Error).message);
              } finally {
                setLoading(false);
              }
            }}
          >
            Delete Field
          </button>
          {isFieldDeleted && <p>Field successfully deleted!</p>}
        </div>
        <div>
          <div>
            <button
              className='px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600'
              data-testid='get-doc-data'
              onClick={async () => {
                try {
                  setLoading(true);
                  setError(null);
                  const docRef = doc(db, 'posts/fV2R5FLNQOGPAEGY08Js');
                  const docData = await getDocData({
                    documentReference: docRef,
                    isFromCache: false,
                  });
                  if (
                    docData &&
                    'title' in docData &&
                    'qty' in docData &&
                    'desc' in docData
                  ) {
                    setDocData({
                      title: docData.title,
                      qty: docData.qty,
                      desc: docData.desc,
                    } as PostData);
                  } else {
                    setDocData(null);
                    setError(
                      'Document data does not match the expected structure.'
                    );
                  }
                } catch (err) {
                  setError((err as Error).message);
                } finally {
                  setLoading(false);
                }
              }}
            >
              Get Document Data
            </button>
            {docData && (
              <pre className='text-green-500' data-testid='doc-data-result'>
                {JSON.stringify(docData, null, 2)}
              </pre>
            )}
          </div>
          <div>
            <button
              className='px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600'
              data-testid='get-docs-data'
              onClick={async () => {
                try {
                  setLoading(true);
                  setError(null);
                  const compositeFilterConstraint = and(
                    where('desc', '!=', 'desc')
                  );
                  const query = createQuery({
                    collectionRef: collection(db, 'posts'),
                    compositeFilterConstraint,
                  });
                  const docsData = await getDocsData({
                    query,
                    isFromCache: false,
                  });
                  setDocsData(docsData);
                } catch (err) {
                  setError((err as Error).message);
                } finally {
                  setLoading(false);
                }
              }}
            >
              Get Documents Data
            </button>
            {docsData && (
              <pre className='text-green-500' data-testid='docs-data-result'>
                {JSON.stringify(docsData as object, null, 2)}
              </pre>
            )}
          </div>
        </div>
        <div>
          <div>
            <button
              className='px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600'
              data-testid='update-doc'
              onClick={async () => {
                try {
                  setLoading(true);
                  setError(null);
                  await updateDoc({
                    db,
                    collectionPath: 'posts',
                    fieldPath: 'qty',
                    docId: 'fV2R5FLNQOGPAEGY08Js',
                    updateValue: {
                      operationType: 'updateFieldWithPrimitive',
                      value: 10,
                    },
                  });
                  setIsDocUpdated(true);
                } catch (err) {
                  setError((err as Error).message);
                  setIsDocUpdated(false);
                } finally {
                  setLoading(false);
                }
              }}
            >
              Update Document
            </button>
            {isDocUpdated && (
              <p data-testid='update-doc-result'>
                Document successfully updated!
              </p>
            )}
          </div>
          <div>
            <h2 className='text-xl font-bold mb-2'>
              Update Document with Operations
            </h2>
            <div>
              <button
                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                data-testid='update-doc-array-union'
                onClick={async () => {
                  try {
                    setLoading(true);
                    setError(null);
                    await updateDoc({
                      db,
                      collectionPath: 'posts',
                      docId: 'fV2R5FLNQOGPAEGY08Js',
                      fieldPath: 'tags',
                      updateValue: {
                        operationType: 'arrayUnion',
                        value: ['newTag', 'another tag'],
                      },
                    });
                    setIsDocUpdated(true);
                  } catch (err) {
                    setError((err as Error).message);
                    setIsDocUpdated(false);
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                Array Union
              </button>
            </div>
          </div>
          <div>
            <button
              className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
              data-testid='update-doc-array-remove'
              onClick={async () => {
                try {
                  setLoading(true);
                  setError(null);
                  await updateDoc({
                    db,
                    collectionPath: 'posts',
                    docId: 'fV2R5FLNQOGPAEGY08Js',
                    fieldPath: 'tags',
                    updateValue: {
                      operationType: 'arrayRemove',
                      value: ['newTag', 'another tag'],
                    },
                  });
                  setIsDocUpdated(true);
                } catch (err) {
                  setError((err as Error).message);
                  setIsDocUpdated(false);
                } finally {
                  setLoading(false);
                }
              }}
            >
              Array Remove
            </button>
          </div>
          <div>
            <button
              className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
              data-testid='update-doc-increment'
              onClick={async () => {
                try {
                  setLoading(true);
                  setError(null);
                  await updateDoc({
                    db,
                    collectionPath: 'posts',
                    docId: 'fV2R5FLNQOGPAEGY08Js',
                    fieldPath: 'qty',
                    updateValue: { operationType: 'increment', value: 1 },
                  });
                  setIsDocUpdated(true);
                } catch (err) {
                  setError((err as Error).message);
                  setIsDocUpdated(false);
                } finally {
                  setLoading(false);
                }
              }}
            >
              Increment
            </button>
          </div>
          {isDocUpdated && (
            <p
              data-testid='update-doc-operations-result'
              className='text-green-500'
            >
              Document successfully updated with operation!
            </p>
          )}
        </div>
      </div>

      <div>
        <div>
          <button
            className='px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600'
            data-testid='watch-doc'
            onClick={() => {
              try {
                setError(null);
                const docRef = doc(db, 'posts/fV2R5FLNQOGPAEGY08Js');
                watchDoc({
                  documentRef: docRef,
                  includeMetadataChanges: false,
                  source: 'default',
                  onError: (err) => {
                    setError(err.message);
                  },
                  onChange: (info) => {
                    if (info.eventSource === 'local') {
                      console.log('Local changes detected');
                    } else {
                      console.log('Server changes detected');
                    }
                    setCurrentDocData(info.data);
                  },
                });
              } catch (err) {
                setError((err as Error).message);
              }
            }}
          >
            Watch Document
          </button>
          {
            <p className={'text-green-500'} data-testid='watch-doc-result'>
              {currentDocData !== null && currentDocData !== undefined
                ? JSON.stringify(currentDocData)
                : 'No data available'}
            </p>
          }
        </div>
        <div>
          <button
            className='px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600'
            data-testid='watch-docs'
            onClick={() => {
              try {
                setError(null);
                const query = createQuery({
                  collectionRef: collection(db, 'posts'),
                  compositeFilterConstraint: and(where('desc', '!=', 'desc')),
                });
                watchDocs({
                  query,

                  includeMetadataChanges: false,
                  source: 'default',
                  onError: (err) => {
                    setError(err.message);
                  },
                  onChange: (info) => {
                    if (info.eventSource === 'local') {
                      console.log('Local changes detected');
                    } else {
                      console.log('Server changes detected');
                    }
                    setCurrentDocsData(info.data);
                  },
                });
                setInterval(() => {
                  setCurrentDocsData(getData());
                }, 1000);
              } catch (err) {
                setError((err as Error).message);
              }
            }}
          >
            Watch Documents
          </button>
          {
            <p className={'text-green-500'} data-testid='watch-docs-result'>
              {currentDocsData !== null && currentDocsData !== undefined
                ? JSON.stringify(currentDocsData)
                : 'No data available'}
            </p>
          }
        </div>
      </div>
      <div className='nonContraitFilterstaints'>
        <div>
          <h2 className='text-xl font-bold mb-2'>
            Test Multiple Conditions Query
          </h2>
          <button
            className='px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600'
            data-testid='test-multiple-conditions'
            onClick={async () => {
              try {
                setLoading(true);
                setError(null);

                const compositeFilterConstraint = and(
                  where('qty', '>', 1),
                  where('desc', '!=', null),
                  where('title', '==', 'custom title')
                );
                const orderByFields: {
                  name: string;
                  order: 'desc' | 'asc';
                }[] = [{ name: 'qty', order: 'desc' }];
                const limitParam = 10;
                const startAtParam = 9;

                const queryParams = {
                  limit: limitParam,
                  startAt: startAt(startAtParam),
                  // Uncomment and modify the following lines as needed:
                  // startAfter: [startAfterParam],
                  // endAt: [endAtParam],
                  // endBefore: [endBeforeParam],
                };

                const query = createQuery({
                  collectionRef: collection(db, 'posts'),
                  compositeFilterConstraint,
                  orderByFields,
                  ...queryParams,
                });
                const docsData = await getDocsData({
                  query,
                  isFromCache: false,
                });
                setQueryDocsData(docsData);
              } catch (err) {
                setError((err as Error).message);
              } finally {
                setLoading(false);
              }
            }}
          >
            Test Multiple Conditions Query
          </button>
          {queryDocsData && (
            <pre
              className='text-green-500'
              data-testid='multiple-conditions-result'
            >
              {JSON.stringify(queryDocsData as object, null, 2)}
            </pre>
          )}
        </div>
      </div>

      <div>
        {loading && 'Loading...'}
        {error && <p className='text-red-500'>{error}</p>}
      </div>
    </div>
  );
};

export default FirestoreFunctionsPage;
