<script>
	const { onclick } = $props();
</script>

<button class="deleteButton" {onclick}>Supprimer</button>

<style>
	.deleteButton {
		font-family: var(--font);
		font-size: 11px;
		font-weight: 500;
		padding: 4px 8px;
		border-radius: 6px;
		cursor: pointer;
		border: 0.5px solid transparent;
		transition:
			background 0.15s,
			color 0.15s;
		background: var(--color-background-delete-button);
		color: var(--color-font-delete-button);
		border-color: var(--color-font-delete-button);
	}

	.deleteButton:hover {
		background: var(--pink-d);
		color: var(--color-font-hover-modify-button);
	}
</style>
