export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11')
];

export const server_loads = [0,3];

export const dictionary = {
		"/": [~4],
		"/auth": [~5,[2]],
		"/auth/error": [6,[2]],
		"/auth/signup": [~7,[2]],
		"/checkout/[slug]": [~8],
		"/plans": [~9],
		"/private": [~10,[3]],
		"/private/profile": [11,[3]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';