<script lang="ts">
	import '../../../../app.css';
	import type { ICours, INotification } from '$lib/@types/types';
	import { onMount } from 'svelte';
	import api from '$lib/services/api.service';
	import { authStore, getAuth } from '$lib/services/localstorage.service.svelte';
	import CoursCard from '../Cours/CoursCard.svelte';
	import ModalNewCours from '../Modal/ModalNewCours.svelte';
	import type { IModal } from '$lib/@types/html';
	import type { IPropsComfirmeNewCours } from '$lib/@types/typeUtils';
	import Notification from './Notification.svelte';

	let cours: ICours[] = $state([]);
	let notifications: INotification[] = $state([]);

	onMount(async () => {
		getAuth();
		// Fetch tous les cours du formateur connecté
		const responseCours = await api('api/cours/instructor/' + authStore?.user?.id);
		cours = responseCours.data;
		const responseNotification = await api('api/notifications/instructor/' + authStore?.user?.id);
		notifications = responseNotification.data;
	});

	function openModalNewCours() {
		const modalNewCours = document.getElementById('modalNewCours') as IModal;
		modalNewCours.show();
	}

	function cancelModalNewCours() {
		const modalNewCours = document.getElementById('modalNewCours') as IModal;
		modalNewCours.close();
	}

	async function comfirmModalNewCours(data: IPropsComfirmeNewCours) {
		await api('api/cours', 'POST', data);
		cancelModalNewCours();
	}

	// ── État ────────────────────────────────────────────────────
	let searchCours = $state('');
	let filteredCours = $derived(
		cours.filter((c) => !searchCours || c.title.toLowerCase().includes(searchCours.toLowerCase()))
	);

	async function seenNotification(id: number) {
		await api('api/notifications/' + id, 'PATCH', { seen: true });
	}

	async function deleteNotification(event, id: number) {
		event.preventDefault();
		await api('api/notifications/' + id, 'DELETE');
		const responseCours = await api('api/cours/instructor/' + authStore?.user?.id);
		cours = responseCours.data;
		const responseNotification = await api('api/notifications/instructor/' + authStore?.user?.id);
		notifications = responseNotification.data;
	}
</script>

<div class="dashboard">
	<div class="dashboard__header">
		<h1 class="dashboard__title">Mon tableau de bord</h1>
	</div>

	<div class="dashboard__grid">
		<!-- ══════════════════════════════
         PANEL 1 — Mes cours
    ══════════════════════════════ -->
		<div class="panel panel--large">
			<div class="panel__head">
				<h2 class="panel__title">Mes cours</h2>
				<div class="panel__head-actions">
					<span class="panel__count">{filteredCours.length}</span>
					<button class="btn-add" title="Nouveau cours" onclick={openModalNewCours}
						>+ Nouveau cours</button
					>
				</div>
			</div>

			<div class="panel__filters">
				<input
					class="input"
					type="text"
					placeholder="Rechercher un cours..."
					bind:value={searchCours}
				/>
			</div>

			<div class="panel__list panel__list--cours">
				{#each filteredCours as c}
					<CoursCard
						class="coursCardDashboard"
						isDashboard={true}
						cours={c}
						--card__image__color={c.category.textColor}
						--border_color={c.category.borderColor}
						--text_color={c.category.textColor}
						--background-color={c.category.backgroundColor}
					/>
				{/each}

				{#if filteredCours.length === 0}
					<p class="panel__empty">Aucun cours trouvé.</p>
				{/if}
			</div>
		</div>

		<!-- ══════════════════════════════
         PANEL 2 — Notifications
    ══════════════════════════════ -->
		<div class="panel">
			<div class="panel__head">
				<h2 class="panel__title">Notifications</h2>
			</div>

			<div class="panel__list panel__list--notifs">
				{#each notifications as notification}
					<Notification {notification} {seenNotification} {deleteNotification} />
				{/each}
			</div>
		</div>
	</div>
	<ModalNewCours cancel={cancelModalNewCours} confirm={comfirmModalNewCours} />
</div>

<style>
	/* ── Tokens ─────────────────────────────────────────────── */
	.dashboard {
		--blue: #1d4e89;
		--blue-l: #ebf2fa;
		--blue-m: #b5d4f4;
		--amber: #f5a623;
		--amber-l: #fef5e7;
		--amber-m: #fac775;

		--dark: #2c3e50;
		--white: #ffffff;
		--gray: #6b7280;
		--border: rgba(44, 62, 80, 0.1);
		--green: #27ae60;
		--green-l: #eaf3de;
		--green-d: #27500a;
		--green-m: #c0dd97;
		--pink-l: #fdedec;
		--pink-d: #a93226;
		--pink-m: #f1948a;
		--pur-l: #f4ecf7;
		--pur-d: #7d3c98;
		--r-md: 10px;
		--r-lg: 16px;
		--font: 'DM Sans', sans-serif;

		font-family: var(--font);
		background: var(--bg);
		min-height: 100vh;
		padding: 32px 40px 60px;
	}

	/* ── Header ─────────────────────────────────────────────── */
	.dashboard__header {
		display: flex;
		align-items: center;
		gap: 14px;
		margin-bottom: 24px;
	}

	.dashboard__title {
		font-family: 'DM Serif Display', serif;
		font-size: 28px;
		font-weight: 400;
		color: var(--dark);
		margin: 0;
	}

	/* ── Grid ───────────────────────────────────────────────── */
	.dashboard__grid {
		display: grid;
		grid-template-columns: 1.7fr 1fr;
		gap: 20px;
		align-items: start;
	}

	/* ── Panel ───────────────────────────────────────────────── */
	.panel {
		background: var(--white);
		border: 0.5px solid var(--border);
		border-radius: var(--r-lg);
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 14px;
		min-width: 0;
		overflow: hidden;
	}

	.panel__head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
	}

	.panel__head-actions {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.panel__title {
		font-size: 15px;
		font-weight: 500;
		color: var(--blue);
		margin: 0;
	}

	.panel__count {
		background: var(--blue-l);
		color: var(--blue);
		font-size: 11px;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: 100px;
	}

	.panel__filters {
		display: flex;
		gap: 8px;
	}

	.panel__list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.panel__list--cours {
		overflow-y: auto;
		flex-direction: row;
	}

	.panel__list--notifs {
		max-height: 480px;
		overflow-x: auto;
		gap: 6px;
	}

	.panel__list--notifs::-webkit-scrollbar {
		width: 4px;
	}
	.panel__list--notifs::-webkit-scrollbar-track {
		background: var(--bg);
		border-radius: 4px;
	}
	.panel__list--notifs::-webkit-scrollbar-thumb {
		background: var(--blue-m);
		border-radius: 4px;
	}

	.panel__empty {
		font-size: 13px;
		color: var(--gray);
		text-align: center;
		padding: 20px 0;
	}

	/* ── Input ───────────────────────────────────────────────── */
	.input {
		height: 36px;
		border: 1px solid var(--border);
		border-radius: var(--r-md);
		padding: 0 12px;
		font-family: var(--font);
		font-size: 13px;
		color: var(--dark);
		background: var(--bg);
		flex: 1;
		outline: none;
		transition: border-color 0.15s;
	}

	.input:focus {
		border-color: var(--blue);
		background: var(--white);
	}

	/* ── Boutons ─────────────────────────────────────────────── */
	.btn-add {
		font-family: 'DM Sans', sans-serif;
		font-size: 14px;
		font-weight: 500;
		padding: 10px 22px;
		border-radius: var(--radius-md);
		cursor: pointer;
		border: none;
		background: var(--blue);
		color: #fff;
	}

	.btn-add:hover {
		background: var(--amber);
		color: var(--white);
	}

	/* ── Responsive ──────────────────────────────────────────── */
	@media (max-width: 1024px) {
		.dashboard {
			padding: 24px 24px 48px;
		}
	}

	@media (max-width: 768px) {
		.dashboard {
			padding: 16px 16px 48px;
			overflow-x: hidden;
		}

		.dashboard__grid {
			grid-template-columns: 1fr;
		}

		.panel {
			min-width: 0;
			overflow: hidden;
		}

		.panel__list--notifs {
			max-height: 320px;
		}
	}
</style>
