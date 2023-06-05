import '$lib/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

const provider = new GoogleAuthProvider();
const auth = getAuth();

async function login() {
	await signInWithPopup(auth, provider);
}

async function logout() {
	await signOut(auth);
}

export default { login, logout };
