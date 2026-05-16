// Seeds from src/shop-data.js via addCollectionAndDocuments.
// After changing shop-data, clear or replace the Firestore `categories` collection
// and run seedCategoriesIfEmpty() again (see README).
import SHOP_DATA from '../../shop-data';
import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from './firebase.utils';

export const seedCategoriesIfEmpty = async () => {
  const existing = await getCategoriesAndDocuments();

  if (existing.length > 0) {
    console.info('Categories collection already has data — seed skipped.');
    return { seeded: false, count: existing.length };
  }

  await addCollectionAndDocuments('categories', SHOP_DATA);
  console.info('Categories seeded from shop-data.js');
  return { seeded: true, count: SHOP_DATA.length };
};
