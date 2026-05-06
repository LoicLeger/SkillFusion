<script lang="ts">
	import Category from '../../Category/Category.svelte';

	const props = $props();

	let name = $derived(props.badge?.name);
	let description = $derived(props.badge?.description);

	let textColor = $derived(props.badge?.textColor);
	let borderColor = $derived(props.badge?.borderColor);
	let backgroundColor = $derived(props.badge?.backgroundColor);

	function onSumbit(event: SubmitEvent) {
		event.preventDefault();
		props.confirm({ name, description ,textColor,borderColor,backgroundColor});
	}

	function cancel() {
		props.cancel();
	}
</script>

<dialog class="overlay" id="modalModifyCategory">
	<div class="dialog">
		<h2>Modification d'une categorie</h2>
		<form onsubmit={onSumbit}>
			<div class="input">
				<label for="name">Nom</label>
				<input id="name" placeholder="Nom du badge" bind:value={name}/>
			</div>
			<div class="input">
				<label for="description">Description</label>
				<textarea name="description" id="description" bind:value={description}
					>{description}</textarea
				>
			</div>
			<div class="input">
				<label for="textColor">Couleur du text : </label>
				<input type="color" bind:value={textColor} />
			</div>
			<div class="input">
				<label for="textColor">Couleur de la bordure : </label>
				<input type="color" bind:value={borderColor} />
			</div>
			<div class="input">
				<label for="textColor">Couleur du fond : </label>
				<input type="color" bind:value={backgroundColor} />
			</div>
			<div class="div_category">
				<Category
					category={{ name: name }}
					--text_color={textColor}
					--border_color={borderColor}
					--background_color={backgroundColor}
				/>
			</div>

			<div class="actions">
				<button class="cancel" type="button" onclick={cancel}> Annuler </button>
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

	h2 {
		margin-bottom: 1rem;
	}

	.div_category {
		width: max-content;
		margin: auto;
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
