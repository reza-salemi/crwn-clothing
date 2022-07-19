import { initializeApp } from 'firebase/app';

import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCcsJmZEfzD2JrrLQK-WOzVB5hYJK0ukao',
	authDomain: 'crown-clothing-db-2840a.firebaseapp.com',
	projectId: 'crown-clothing-db-2840a',
	storageBucket: 'crown-clothing-db-2840a.appspot.com',
	messagingSenderId: '210084286000',
	appId: '1:210084286000:web:1417b312a3a21f48df67f5',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'user', userAuth.uid);

	const userSnapShot = await getDoc(userDocRef);

	if (!userSnapShot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Can not create user, email already in use');
			} else {
				console.log('error creating the user', error.message);
			}
		}
	}
	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};
