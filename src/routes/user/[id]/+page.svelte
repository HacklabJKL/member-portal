<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<h1>{data.user.username}</h1>
</main>
