<script lang="ts">
	import api from '$lib/services/api.service';
	import { authStore } from '$lib/services/localstorage.service.svelte';

	let {
	    commentId,
	    onClose
	}: {
		commentId: number | null;
		onClose: () => void;
	} = $props();

	let reportReason = $state('');

	function close() {
	    onClose();
	    reportReason = '';
	}

	async function submit() {
	    if (!commentId || !reportReason) return;

	    await api(`api/comments/${commentId}/report`, 'POST', {
	        reason: reportReason,
	        commentId,
	        reporterId: authStore.user?.id
	    });

	    onClose();
	    reportReason = '';
	}
</script>

<div
	class="modal-overlay"
	role="button"
	tabindex="0"
	onclick={close}
	onkeydown={(e) => e.key === 'Escape' && close()}
>
	<div
		class="modal"
		role="dialog"
		aria-modal="true"
		onclick={(e) => e.stopPropagation()}
		onkeydown={(e) => e.stopPropagation()}
	>
		<h3 class="modal__title">Signaler un commentaire</h3>
		<p class="modal__text">Pourquoi signalez-vous ce commentaire ?</p>

		<select class="modal__select" bind:value={reportReason}>
			<option value="">Choisir une raison...</option>
			<option value="Contenu inapproprié">Contenu inapproprié</option>
			<option value="Spam">Spam</option>
			<option value="Informations incorrectes">Informations incorrectes</option>
			<option value="Harcèlement">Harcèlement</option>
			<option value="Autre">Autre</option>
		</select>

		<div class="modal__actions">
			<button class="modal__btn modal__btn--cancel" onclick={close}> Annuler </button>
			<button class="modal__btn modal__btn--report" onclick={submit} disabled={!reportReason}>
				Signaler
			</button>
		</div>
	</div>
</div>

<style>
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.35);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		backdrop-filter: blur(2px);
	}

	.modal {
		background: #fff;
		border-radius: 12px;
		padding: 28px 32px;
		max-width: 380px;
		width: 90%;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.modal__title {
		font-size: 16px;
		font-weight: 600;
		color: #1a1a1a;
		margin: 0;
	}

	.modal__text {
		font-size: 13px;
		color: #6b7280;
		margin: 0;
	}

	.modal__select {
		padding: 8px 12px;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		font-size: 13px;
		font-family: inherit;
		outline: none;
		width: 100%;
	}

	.modal__select:focus {
		border-color: #1d4e89;
	}

	.modal__actions {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		margin-top: 8px;
	}

	.modal__btn {
		font-family: inherit;
		font-size: 13px;
		font-weight: 500;
		padding: 8px 16px;
		border-radius: 8px;
		cursor: pointer;
		border: none;
		transition: opacity 0.15s;
	}

	.modal__btn--cancel {
		background: #f3f4f6;
		color: #6b7280;
	}

	.modal__btn--report {
		background: #ef4444;
		color: white;
	}

	.modal__btn--report:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
