<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<h1>Hello, {data.user.username}</h1>
	<p>This is your profile page, where you can see and update your information:</p>
	<ul>
		<li>
			Email: {data.user.email}
		</li>
		<li>
			matrixIx: {data.user.matrixId}
		</li>
	</ul>
</main>
