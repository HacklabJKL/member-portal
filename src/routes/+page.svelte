<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if data.loggedIn}
	<p>You are logged in as {data?.username}</p>
	<a href="/logout">Log Out</a>
{:else}
	<p>You are not logged in</p>
	<a href="/login">Log In</a>
	<a href="/signup">Sign Up</a>
{/if}
```
