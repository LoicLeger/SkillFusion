<script lang="ts">
	let { children, class: className = '' } = $props();
</script>

<section class={'section__main ' + className}>
	{@render children()}
</section>

<style>
	.section__main {
		padding: 20px;
		flex-grow: 1;
		background-color: var(--background-color);
		padding: auto;
	}

	.main-cours {
		padding: 0;
	}
	@media (min-width: 1024px) {
		.section__main {
			padding: 25px 100px;
		}
		.main-cours {
			padding: 0;
		}
	}
</style>
