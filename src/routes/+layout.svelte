<script>
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
    import "../app.css";
	import Header from '$lib/componets/header.svelte';

	export let data;
	$: ({ session, supabase } = data);
 
	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<Header></Header>

<slot />