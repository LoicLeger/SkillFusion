<script lang="ts">
	import { goto } from '$app/navigation';
	import api from '$lib/services/api.service';
	import { clearAuth } from '$lib/services/localstorage.service.svelte';

	type Etape = 'idle' | 'confirmation' | 'blocage';

	let etape: Etape = $state('idle');
	let coursBloquants: { id: number; title: string }[] = $state([]);

	async function demanderSuppression() {
		const res = await api('api/users/me', 'DELETE');

		if (res.status === 204) {
			clearAuth();
			goto('/');
			return;
		}

		if (res.status === 409) {
			coursBloquants = res.data.cours;
			etape = 'blocage';
			return;
		}

		console.error('Erreur lors de la suppression du compte');
	}

	async function transfererEtSupprimer() {
		await api('api/cours/mine/transfer', 'PATCH');
		await demanderSuppression();
	}

	async function supprimerCoursEtCompte() {
		await api('api/cours/mine', 'DELETE');
		await demanderSuppression();
	}
</script>

{#if etape === 'idle'}
	<button class="btn-delete" type="button" onclick={() => (etape = 'confirmation')}>
		Supprimer mon compte
	</button>
{:else if etape === 'confirmation'}
	<p class="msg-warning">
		Cette action est irréversible. Confirmer la suppression de votre compte ?
	</p>
	<div class="btn-group">
		<button class="btn-confirm" type="button" onclick={demanderSuppression}>
			Oui, supprimer
		</button>
		<button class="btn-cancel" type="button" onclick={() => (etape = 'idle')}> Annuler </button>
	</div>
{:else if etape === 'blocage'}
	<p class="msg-warning">
		Vous avez {coursBloquants.length} cours créé(s). Que souhaitez-vous faire ?
	</p>
	<ul class="cours-list">
		{#each coursBloquants as c}
			<li>{c.title}</li>
		{/each}
	</ul>
	<div class="btn-group">
		<button class="btn-transfer" type="button" onclick={transfererEtSupprimer}>
			Transférer à l'admin
		</button>
		<button class="btn-confirm" type="button" onclick={supprimerCoursEtCompte}>
			Supprimer mes cours
		</button>
		<button class="btn-cancel" type="button" onclick={() => (etape = 'idle')}> Annuler </button>
	</div>
{/if}

<style>
	.btn-delete {
		padding: 15px;
		cursor: pointer;
		background-color: white;
		border-radius: 10px;
		border: 1px solid #e53e3e;
		color: #e53e3e;
		font-weight: bold;
		margin-top: 10px;
		margin-left: 10px;
	}
	.btn-delete:hover {
		background-color: #fff5f5;
	}

	.btn-confirm {
		padding: 10px 15px;
		cursor: pointer;
		background-color: #e53e3e;
		border-radius: 10px;
		border: none;
		color: white;
		font-weight: bold;
	}
	.btn-confirm:hover {
		background-color: #c53030;
	}

	.btn-transfer {
		padding: 10px 15px;
		cursor: pointer;
		background-color: #1d4e89;
		border-radius: 10px;
		border: none;
		color: white;
		font-weight: bold;
	}
	.btn-transfer:hover {
		background-color: rgba(29, 78, 137, 0.8);
	}

	.btn-cancel {
		padding: 10px 15px;
		cursor: pointer;
		background-color: white;
		border-radius: 10px;
		border: 1px solid lightgray;
		color: black;
	}
	.btn-cancel:hover {
		background-color: #f5f5f5;
	}

	.btn-group {
		display: flex;
		gap: 10px;
		margin-top: 10px;
		flex-wrap: wrap;
	}

	.msg-warning {
		color: #e53e3e;
		font-weight: bold;
		margin-top: 10px;
	}

	.cours-list {
		font-size: 13px;
		color: #6b7280;
		margin: 8px 0 0 20px;
	}
</style>
