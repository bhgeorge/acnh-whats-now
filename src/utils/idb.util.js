import { openDB } from 'idb';
import DB_TABLES from '@/constants/db';

const IS_CAUGHT = 'isCaught';

const dbPromise = openDB(DB_TABLES.CAUGHT, 1, {
  upgrade(db) {
    db.createObjectStore(IS_CAUGHT);
  },
});

export default {
  async get(key) {
    return (await dbPromise).get(IS_CAUGHT, key);
  },

  async set(key, val) {
    return (await dbPromise).put(IS_CAUGHT, val, key);
  },

  async delete(key) {
    return (await dbPromise).delete(IS_CAUGHT, key);
  },

  async allKeys() {
    return (await dbPromise).getAllKeys(IS_CAUGHT);
  },
};
