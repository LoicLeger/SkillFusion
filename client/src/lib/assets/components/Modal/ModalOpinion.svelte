<script lang="ts">
	import type { ITextArea } from "$lib/@types/html";

	const props = $props();
	let hovered = $state(0);
	let currentContent= $state();
	let currentNote=$state(0);

	$effect(()=>{
		currentNote=props.opinion.opinion.note
	})

	async function submitNote(): Promise<void> {
		currentContent = document.getElementById("textarea")?.value as ITextArea;
		props.confirm(currentNote, currentContent )
	}
</script>

<dialog class="overlay" id="ModalOpinion">
	<div class="dialog">
		<form action="">
			<h2>Confirmation</h2>
			{#if props.opinion.IsOpinionExisting}
			<p>Veuillez modifier votre avis :</p>
			{:else}
			<p>{props.message}</p>
			{/if}

			<div class="stars">
				{#each [1,2,3,4,5] as star}
					<span
						class="star"
						role="button"
						tabindex="0"
						class:active={star <= (currentNote || hovered)}
						onclick={() => (currentNote = star)}
						onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (currentNote = star)}
						onmouseenter={() => (hovered = star)}
						onmouseleave={() => (hovered = 0)}
					>
						★
					</span>
				{/each}
			</div>
			{#if props.opinion.IsOpinionExisting}
			<textarea  id="textarea" placeholder="Merci de modifier votre avis : {props.opinion.opinion.content} ">{props.opinion.opinion.content}</textarea>
			{:else}
			<textarea  id="textarea" placeholder="Merci de laisser votre avis"></textarea>
			{/if}

			<div class="actions">
				<button class="cancel" onclick={props.cancel}> Annuler </button>
				<button class="confirm" onclick={()=>submitNote()}> Valider </button>
			</div>
		</form>
	</div>
</dialog>

<style>

	textarea{
		margin: 0px;
		width: 80%;
		height: 50px;
	}
	.stars {
		display: flex;
		justify-content: center;
		gap: 0.25rem;
	}

	.star {
		font-size: 2rem;
		color: #ccc;
		cursor: pointer;
		transition: color 0.2s;
		background: none;
		padding: 10px 0;
	}

	.star.active {
		color: gold;
	}
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
		margin-bottom: 0;
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
