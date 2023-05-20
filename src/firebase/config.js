import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
	apiKey: 'AIzaSyCbSOO91Akc9JkCIv2jtMvVFpcqCBQka9c',
	authDomain: 'journal-react-eebba.firebaseapp.com',
	projectId: 'journal-react-eebba',
	storageBucket: 'journal-react-eebba.appspot.com',
	messagingSenderId: '16938265921',
	appId: '1:16938265921:web:ccc7b829aee7f99df345c0',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth and get reference to the service
export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseFirestore = getFirestore(FirebaseApp);
