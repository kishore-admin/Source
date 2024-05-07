import {getApp, getApps, initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDwX7JlIfWadfIqSNxzZsbSk3lXmld0BKI',
  authDomain: 'ecom-project-cef50.firebaseapp.com',
  databaseURL:
    'https://ecom-project-cef50-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'ecom-project-cef50',
  storageBucket: 'ecom-project-cef50.appspot.com',
  messagingSenderId: '58239290286',
  appId: '1:58239290286:web:630328351dc0482cc2163f',
  measurementId: 'G-84P32S9TGG',
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
export {auth, database};
