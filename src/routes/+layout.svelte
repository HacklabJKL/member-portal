<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Hacklab</title>
</svelte:head>
<slot />
<div>
	{#if data.loggedIn}
		<p>You are logged in as {data?.username}</p>
		{#if $page.url.pathname !== '/profile'}
			<a href="/profile">Go to Profile</a>
		{/if}
		<a href="/logout">Log Out</a>
	{:else}
		<p>You are not logged in</p>
		<a href="/login">Log In</a>
		<a href="/signup">Sign Up</a>
	{/if}
</div>
