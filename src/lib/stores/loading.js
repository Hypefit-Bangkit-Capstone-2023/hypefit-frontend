import { writable } from 'svelte/store';

const isAuthLoaded = writable(false);
const isDataLoaded = writable(false);

export { isAuthLoaded, isDataLoaded };
