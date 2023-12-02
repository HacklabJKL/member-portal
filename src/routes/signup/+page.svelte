<script lang="ts">
	import { page } from '$app/stores';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<h1>Become a member of {data.hacklabName}!</h1>
<form method="post">
	{#if $page.status === 400 && form?.errors?.username}
		<p>{form.errors.username}</p>
	{/if}
	<input type="text" placeholder="Username" name="username" />
	{#if $page.status === 400 && form?.errors?.email}
		<p>{form.errors.email}</p>
	{/if}
	<input type="email" placeholder="Email" name="email" />
	{#if $page.status === 400 && form?.errors?.password}
		<p>{form.errors.password}</p>
	{/if}
	<input type="password" placeholder="Password" name="password" />
	<input type="password" placeholder="Confirm Password" name="passwordRepeat" />
	<button type="submit">Sign Up</button>
</form>
