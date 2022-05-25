import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { DB_TABLE_POSTS } from '../../../../config/constants';

const postQuery = query(collection(db, DB_TABLE_POSTS));
const unsubscribe = onSnapshot(postQuery, snapshot => {
  const collection = [];
  snapshot.forEach(doc => {
    collection.push({...doc.data(), id: doc.id});
  });
  console.log(collection);
});
