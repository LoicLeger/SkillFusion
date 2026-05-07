<script lang="ts">
	const props = $props();

	let name = $derived(props.badge?.name);
	let description = $derived(props.badge?.description);

	function onSumbit(event: SubmitEvent) {
	    event.preventDefault();
	    props.confirm({ name, description });
	}
</script>

<dialog class="overlay" id="modalModifyBadge">
	<div class="dialog">
		<h2>Modification d'un badge</h2>
		<form onsubmit={onSumbit}>
			<div class="input">
				<label for="name">Nom</label>
				<input id="name" placeholder="Nom du badge" bind:value={name} />
			</div>
			<div class="input">
				<label for="description">Description</label>
				<textarea name="description" id="description" bind:value={description}
					>{description}</textarea
				>
			</div>
			<div class="input">
				<label for="icon">Icon</label>
				<select>
					<option>1</option>
				</select>
			</div>

			<div class="actions">
				<button class="cancel" type="button" onclick={props.cancel}> Annuler </button>
				<button class="confirm" type="submit"> Valider </button>
			</div>
		</form>
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

	label {
		margin-bottom: 0.5rem;
		font-weight: bold;
		color: #444;
	}

	input,
	select,
	textarea {
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 8px;
		font-size: 1rem;
	}

	input:focus,
	select:focus,
	textarea:focus {
		outline: none;
		border-color: #e53935;
		box-shadow: 0 0 0 2px rgba(229, 57, 53, 0.2);
	}

	h2 {
		margin-bottom: 1rem;
	}

	.actions {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 1rem;
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
		background: var(--color-background-delete-button);
		color: var(--color-font-delete-button);
		border-color: var(--color-font-delete-button);
	}

	.cancel:hover {
		background: var(--pink-d);
		color: var(--color-font-hover-modify-button);
	}

	.confirm {
		background: var(--color-background-modify-button);
		color: var(--color-font-modify-button);
		border-color: var(--color-font-modify-button);
	}

	.confirm:hover {
		background: var(--color-font-background-modify-button);
		color: var(--color-font-hover-modify-button);
	}
</style>
