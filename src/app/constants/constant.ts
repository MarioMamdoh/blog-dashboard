import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyDumPku4Z3ahT5xM958qSwpLwR_j2zbonQ',
  authDomain: 'app-blog-9326e.firebaseapp.com',
  projectId: 'app-blog-9326e',
  storageBucket: 'app-blog-9326e.appspot.com',
  messagingSenderId: '410006641670',
  appId: '1:410006641670:web:1fe591f6f50936ef6e7787',
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage();
