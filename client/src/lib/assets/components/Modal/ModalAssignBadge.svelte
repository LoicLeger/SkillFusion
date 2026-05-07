<script lang="ts">
	import api from '$lib/services/api.service';
	import { onMount } from 'svelte';
	import type { IInput } from '$lib/@types/html';
	import type { IBadge } from '$lib/@types/types';
	import Badge from '../Badge/Badge.svelte';

	const props = $props();
	let badges: IBadge[] = $state([]);

	onMount(async () => {
		const response = await api('api/badges');
		badges = response.data;
		console.log(badges)
	});


</script>

<dialog class="overlay" id="modalAssignBadge">
	<div class="dialog">
		<h2>Nouveau Cours</h2>
		<form >
			<div class="input">
				<label for="title">Choisir un badge</label>
				<div class="div_choice">
					{#each badges as badge}
					<div>
						<Badge badge={badge} --color={badge.color} />
						<button type="button" onclick={()=>props.confirm(badge.id)}>Assigner</button>
						</div>
					{/each}
				</div>
			</div>
			<div class="actions">
				<button class="cancel" type="button" onclick={props.cancel}> Annuler </button>
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

	.input {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
		text-align: left;
	}

	label {
		margin-bottom: 0.5rem;
		font-weight: bold;
		color: #444;
	}

	.div_choice{
		display: flex;
		flex-direction: row;
		overflow-y: auto;
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
		background: #ddd;
	}

	.confirm {
		background: #e53935;
		color: white;
	}
</style>
