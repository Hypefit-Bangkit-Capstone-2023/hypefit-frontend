import { browser } from '$app/environment';
import { PUBLIC_API_URL } from '$env/static/public';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import '$lib/firebase';

const api = axios.create({
	baseURL: PUBLIC_API_URL
});

/** @param {import('axios').InternalAxiosRequestConfig} config */
async function onRequest(config) {
	if (browser) {
		const access_token = await new Promise((resolve) => {
			onAuthStateChanged(getAuth(), async (user) => {
				resolve(await user?.getIdToken());
			});
		});
		if (access_token && config.headers) {
			config.headers.Authorization = `Bearer ${access_token}`;
		}
	}
	return config;
}

api.interceptors.request.use(onRequest, null);

export default api;
