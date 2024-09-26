<script>
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
    import "../app.css";

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

<header class="w-full">
    <nav class="flex ml-auto gap-4 px-4 py-4 bg-gray-200">
        <a href="/">Home</a>
        <a href="/private/profile">Profile</a>
        <a href="/checkout">Plans</a>

        <a href="/auth">Login</a>
        <a href="/auth/signup">Signup</a>
    </nav>
</header>

<slot />