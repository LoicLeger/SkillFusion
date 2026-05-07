<script>
	const props = $props();
</script>

<dialog class="overlay" id={props.id}>
	<div class="dialog">
		<h2>Confirmation</h2>
		<p>{props.message}</p>

		<div class="actions">
			<button class="cancel" onclick={props.cancel}> Annuler </button>
			<button class="confirm" onclick={props.confirm}> Valider </button>
		</div>
	</div>
</dialog>

<style>
	.overlay {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.6);
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}

	.dialog {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		width: 90%;
		max-width: 400px;
		text-align: center;
		margin: auto;
		margin-top: 50vh;
		transform: translateY(-50%);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	h2 {
		margin-bottom: 1rem;
	}

	p {
		margin-bottom: 2rem;
		color: #444;
	}

	.actions {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	button {
		flex: 1;
		padding: 0.75rem;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-weight: bold;
	}

	.cancel {
		background: #ddd;
	}

	.confirm {
		background: #e53935;
		color: white;
	}
</style>
