<script>
	const { onclick } = $props();
</script>

<button class="modifyButton" {onclick}>Modifier</button>

<style>
	.modifyButton {
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
		background: var(--color-background-modify-button);
		color: var(--color-font-modify-button);
		border-color: var(--color-font-modify-button);
	}

	.modifyButton:hover {
		background: var(--color-font-background-modify-button);
		color: var(--color-font-hover-modify-button);
	}
</style>
