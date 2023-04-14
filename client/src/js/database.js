import { openDB } from 'idb';

const initdb = async () =>
  // Create a new database named 'jate' that will be using version 1 of the database
  openDB('jate', 1, {
    // Add the database schema if it has not already been initialized
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create a new object store for the data and give it a key name of 'id' that needs to increment automatcially
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('putDb');
  // Create a connection to the database and version
  const jateDb = await openDB('jate', '1');
  // Create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open up the desired object store
  const store = tx.objectStore('jate');
  // Use the .put() method to update the database
  const request = store.put({ id: 1, value: content });
  // Get confirmation of the request
  const result = await request;
  console.log('Text saved to database', result);
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb');
  // Create a connection to the database and version
  const jateDb = await openDB('jate', '1');
  // Create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readonly');
  // Open up the desired object store
  const store = tx.objectStore('jate');
  // Use the .getAll() method to get all data in the database
  const request = store.get(1);
  // Get confirmation of the request
  const result = await request;
  console.log('Text retrieved from database', result);
  return result?.value;
};

initdb();
