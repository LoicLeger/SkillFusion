<script>
	import DeleteButton from '../../Button/DeleteButton.svelte';
	import ModifyButton from '../../Button/ModifyButton.svelte';

	const { children,openModifyModal,openDeleteModal } = $props();
</script>

<article class="article_dashboard">
	{@render children()}
	<div class="article_dashboard--div_button">
		<ModifyButton onclick={openModifyModal}/>
		<DeleteButton onclick={openDeleteModal} />
	</div>
</article>

<style>
	.article_dashboard {
		display: flex;
		background-color: var(--background-color);
	}

	.article_dashboard--div_button {
		margin-left: auto;
		margin-right: 10px;
		margin-top: auto;
		margin-bottom: auto;
		align-items: center;
        display: flex;
        flex-direction: row;
        gap:10px;
	}

	@media (min-width: 768px) {
	}
	@media (min-width: 1024px) {
	}
</style>
