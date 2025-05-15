'use client';
import {
  and,
  collection,
  createQuery,
  getAverageForQuery,
  getCountForQuery,
  getFirestore,
  getSumForQuery,
  initializeApp,
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
                const result = await getSumForQuery(query, 'qty');
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
                const count = await getCountForQuery(query);

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
                const average = await getAverageForQuery(query, 'qty');

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
      {loading && <p className='text-gray-500'>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
};

export default FirestoreFunctionsPage;
