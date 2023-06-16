import { writable } from 'svelte/store';

const isAuthLoaded = writable(false);
const isDataLoaded = writable(true);

export { isAuthLoaded, isDataLoaded };
