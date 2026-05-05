<script lang="ts">
	// ── Données en dur ──────────────────────────────────────────
	import api from '$lib/services/api.service';
	import { onMount } from 'svelte';
	import type { ICategory, ICours, IRole, IUser } from '$lib/@types/types';
	import '../../../../app.css';
	import ModalValidator from '../Modal/ModalValidator.svelte';
	import type { IModal } from '$lib/@types/html';
	import { refreshAll } from '$app/navigation';

	let users: IUser[] = $state([]);
	let roles: IRole[] = $state([]);
	let cours: ICours[] = $state([]);
	let categories: ICategory[] = $state([]);

	onMount(async () => {
		// Fetch tous les roles
		const responseRoles = await api('api/roles');
		roles = responseRoles.data;

		// Fetch tous les users
		const responseUsers = await api('api/users');
		users = responseUsers.data;

		// Fetch tous les cours
		const responseCours = await api('api/cours');
		cours = responseCours.data;

		// Fetch toutes les categories
		const responseCategories = await api('api/categories');
		categories = responseCategories.data;
	});

	const badges = [
		{ nom: 'Première réalisation', icone: '⭐', couleur: 'amber' },
		{ nom: 'Cours terminé', icone: '✓', couleur: 'green' },
		{ nom: 'En progression', icone: '↑', couleur: 'blue' },
		{ nom: 'Expert bricoleur', icone: '🏆', couleur: 'amber' }
	];


	// ── Filtres ─────────────────────────────────────────────────
	let searchUsers = $state('');
	let filterRole = $state('');
	let searchCours = $state('');
	let searchBadges = $state('');
	let searchCats = $state('');

	const filteredUsers = $derived(
		users.filter((u) => {
			const matchSearch =
				!searchUsers ||
				u.lastname.toLowerCase().includes(searchUsers.toLowerCase()) ||
				u.firstname.toLowerCase().includes(searchUsers.toLowerCase()) ||
				u.pseudo.toLowerCase().includes(searchUsers.toLowerCase());
			const matchRole = !filterRole || u.role.name === filterRole;
			return matchSearch && matchRole;
		})
	);

	const filteredCours = $derived(
		cours.filter((c) => !searchCours || c.title.toLowerCase().includes(searchCours.toLowerCase()))
	);

	const filteredBadges = $derived(
		badges.filter((b) => !searchBadges || b.nom.toLowerCase().includes(searchBadges.toLowerCase()))
	);

	const filteredCats = $derived(
		categories.filter((c) => !searchCats || c.name.toLowerCase().includes(searchCats.toLowerCase()))
	);


	let errorMessage = $state('');
	let successMessage = $state('');

	let userToDelete = $state<number | null>(null);
	let categoryToDelete =$state<number | null>(null);

	async function confirmDeleteCategory() {
	if(!categoryToDelete)return;
		const response = await api(`api/categories/${categoryToDelete}`, "DELETE");
		
		if (response.status === 204 || response.status ===200){
			categories = categories.filter((c) => c.id !== categoryToDelete);
			successMessage = 'La catégorie a été supprimé avec succès';
			errorMessage='';
			setTimeout(()=>(successMessage='', 5000))
		}else {
			errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
			successMessage = '';
			setTimeout(() => (errorMessage = ''), 5000);
		}
		categoryToDelete = null;
		let refreshCourses =  await api('api/cours')
		cours = refreshCourses.data
		cancelDeleteCategory();

	}

	async function confirmDeleteUser() {
		if (!userToDelete) return;

		const response = await api(`api/users/${userToDelete}`, 'DELETE');

		if (response.status === 204 || response.status === 200) {
			users = users.filter((u) => u.id !== userToDelete);
			successMessage = 'Utilisateur supprimé avec succès';
			errorMessage = '';
			setTimeout(() => (successMessage = ''), 5000);
		} else {
			errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
			successMessage = '';
			setTimeout(() => (errorMessage = ''), 5000);
		}
		userToDelete = null;
		cancelDeleteUser();
	}

	function cancelDeleteUser() {
		const modal = document.getElementById('modalDeleteUser') as IModal;
		if (modal) {
			modal.close();
		}
	}

	function openModalDeleteUser(userId: number) {
		userToDelete = userId;
		const modal = document.getElementById('modalDeleteUser') as IModal;
		if (modal) {
			modal.show();
		}
	}

	function cancelDeleteCategory() {
		const modal = document.getElementById('modalDeleteCategory') as IModal;
		if (modal) {
			modal.close();
		}
	}

	function openModalDeleteCategory(CategoryId: number) {
		categoryToDelete = CategoryId;
		const modal = document.getElementById('modalDeleteCategory') as IModal;
		if (modal) {
			modal.show();
		}
	}

	async function updateRole(userId: number, roleName: string) {
		const role = roles.find((r) => r.name === roleName);
		if (!role) return;

		const response = await api(`api/users/${userId}`, 'PATCH', { rolesId: role.id });

		if (response.status === 200) {
			users = users.map((u) =>
				u.id === userId
					? {
							...u,
							role: {
								...u.role,
								name: roleName,
								frName: roles.find((r) => r.name === roleName)?.frName ?? ''
							}
						}
					: u
			);
			successMessage = 'Rôle mis à jour avec succès';
			setTimeout(() => (successMessage = ''), 5000);
		} else {
			errorMessage = 'Erreur lors de la mise à jour du rôle';
			setTimeout(() => (errorMessage = ''), 5000);
		}
	}
</script>

<div class="dashboard">
	<div class="dashboard__header">
		<h1 class="dashboard__title">Mon tableau de bord</h1>
	</div>

	{#if successMessage}
		<p class="success" style="color:green">{successMessage}</p>
	{/if}

	{#if errorMessage}
		<p class="error" style="color:red">{errorMessage}</p>
	{/if}

	<div class="dashboard__grid">
		<!-- ══════════════════════════════
         PANEL 1 — Utilisateurs
    ══════════════════════════════ -->
		<div class="panel">
			<div class="panel__head">
				<h2 class="panel__title">Utilisateurs</h2>
				<span class="panel__count">{filteredUsers.length}</span>
			</div>

			<div class="panel__filters">
				<input class="input" type="text" placeholder="Rechercher..." bind:value={searchUsers} />
				<select class="input input--select" bind:value={filterRole}>
					<option value="">Tous les rôles</option>
					{#each roles as r}
						<option value={r.name}>{r.frName}</option>
					{/each}
				</select>
			</div>

			<!-- En-tête colonnes -->
			<div class="table-head">
				<span>Nom</span>
				<span>Prénom</span>
				<span>Pseudo</span>
				<span>Rôle</span>
			</div>

			<div class="panel__list">
				{#each filteredUsers as user}
					<div class="table-row">
						<span class="table-row__cell">{user.lastname}</span>
						<span class="table-row__cell">{user.firstname}</span>
						<span class="table-row__cell table-row__cell--pseudo">{user.pseudo}</span>
						<span class="badge">
							<select
								class="role-user"
								value={user.role.name}
								onchange={(e) => updateRole(user.id, e.currentTarget.value)}
							>
								{#each roles as r}
									<option value={r.name}>{r.frName}</option>
								{/each}
							</select>
							<button class="delete-btn delete-btn--edit" onclick={() => openModalDeleteUser(user.id)}>
								x</button
							>
						</span>
					</div>
				{/each}

				{#if filteredUsers.length === 0}
					<p class="panel__empty">Aucun utilisateur trouvé.</p>
				{/if}
			</div>
		</div>

		<!-- ══════════════════════════════
         PANEL 2 — Cours
    ══════════════════════════════ -->
		<div class="panel">
			<div class="panel__head">
				<h2 class="panel__title">Cours</h2>
				<span class="panel__count">{filteredCours.length}</span>
			</div>

			<div class="panel__filters">
				<input class="input" type="text" placeholder="Rechercher..." bind:value={searchCours} />
			</div>

			<div class="panel__list">
				{#each filteredCours as c}
					<div class="list-row">
						{#if c.visibility == true}
							🟢
						{:else if c.visibility == false}
							🔴
						{/if}
						<div class="list-row__info">
							<p class="list-row__title">{c.title}</p>
							<span class="badge badge--cat" style="color:{c.category.textColor}"
								>{c.category.name}</span
							>
						</div>
						<span class="list-row__date">{new Date(c.updatedAt).toLocaleDateString()}</span>
					</div>
				{/each}

				{#if filteredCours.length === 0}
					<p class="panel__empty">Aucun cours trouvé.</p>
				{/if}
			</div>
		</div>

		<!-- ══════════════════════════════
         PANEL 3 — Badges
    ══════════════════════════════ -->
		<div class="panel">
			<div class="panel__head">
				<h2 class="panel__title">Gestion des badges</h2>
				<button class="btn-add" title="Ajouter un badge">+</button>
			</div>

			<div class="panel__filters">
				<input class="input" type="text" placeholder="Rechercher..." bind:value={searchBadges} />
			</div>

			<div class="panel__list">
				{#each filteredBadges as b}
					<div class="list-row list-row--badge">
						<div class="badge-icon badge-icon--{b.couleur}">
							{b.icone}
						</div>
						<p class="list-row__title">{b.nom}</p>
						<div class="list-row__actions">
							<button class="action-btn action-btn--edit">Modifier</button>
							<button class="action-btn action-btn--delete">Supprimer</button>
						</div>
					</div>
				{/each}

				{#if filteredBadges.length === 0}
					<p class="panel__empty">Aucun badge trouvé.</p>
				{/if}
			</div>
		</div>

		<!-- ══════════════════════════════
         PANEL 4 — Catégories
    ══════════════════════════════ -->
		<div class="panel">
			<div class="panel__head">
				<h2 class="panel__title">Gestion des catégories</h2>
				<button class="btn-add" title="Ajouter une catégorie">+</button>
			</div>

			<div class="panel__filters">
				<input class="input" type="text" placeholder="Rechercher..." bind:value={searchCats} />
			</div>

			<div class="panel__list">
				{#each filteredCats as cat}
					<div class="list-row">
						<span class="badge badge--cat" style="color:{cat.textColor}">{cat.name}</span>
						<div class="list-row__actions">
							<button class="action-btn action-btn--edit">Modifier</button>
							<button class="action-btn action-btn--delete" onclick={() => openModalDeleteCategory(cat.id)}>Supprimer</button>
						</div>
					</div>
				{/each}

				{#if filteredCats.length === 0}
					<p class="panel__empty">Aucune catégorie trouvée.</p>
				{/if}
			</div>
		</div>
	</div>
	<ModalValidator
		id="modalDeleteUser"
		message="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
		cancel={cancelDeleteUser}
		confirm={confirmDeleteUser}
	/>
	<ModalValidator
		id="modalDeleteCategory"
		message="Êtes-vous sûr de vouloir supprimer cette catégorie ?"
		cancel={cancelDeleteCategory}
		confirm={confirmDeleteCategory}
	/>
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
		--bg: #f7f4ef;
		--dark: #2c3e50;
		--white: #ffffff;
		--gray: #6b7280;
		--border: rgba(44, 62, 80, 0.1);
		--green-l: #eaf3de;
		--green-d: #27500a;
		--green-m: #c0dd97;
		--pink-l: #fdedec;
		--pink-d: #a93226;
		--pink-m: #f1948a;
		--pur-l: #f4ecf7;
		--pur-d: #7d3c98;
		--teal-l: #e1f5ee;
		--teal-d: #085041;
		--r-md: 10px;
		--r-lg: 16px;
		--font: 'DM Sans', sans-serif;

		font-family: var(--font);
		background: var(--bg);
		min-height: 100vh;
		padding: 32px 40px 60px;
	}

	/* ── Header page ─────────────────────────────────────────── */
	.dashboard__header {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 14px;
		margin-bottom: 28px;
	}

	.dashboard__title {
		font-family: 'DM Serif Display', serif;
		font-size: 28px;
		font-weight: 400;
		color: var(--dark);
		margin: 0;
	}

	.role-user {
		background: transparent;
		border: none;
		color: var(--pink-d);
		font-size: 11px;
		font-weight: 600;
		padding: 3px 10px;
		border-radius: 100px;
		letter-spacing: 0.04em;
		cursor: pointer;
	}

	.dashboard__role-pill {
		background: var(--pink-l);
		color: var(--pink-d);
		border: 0.5px solid var(--pink-m);
		font-size: 11px;
		font-weight: 600;
		padding: 3px 10px;
		border-radius: 100px;
		letter-spacing: 0.04em;
	}

	/* ── Grid 2x2 ────────────────────────────────────────────── */
	.dashboard__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
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
	}

	.panel__head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
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
		flex-wrap: wrap;
		gap: 8px;
	}

	.panel__list {
		display: flex;
		flex-direction: column;
		gap: 4px;
		max-height: 320px;
		overflow-y: auto;
	}

	.panel__list::-webkit-scrollbar {
		width: 4px;
	}
	.panel__list::-webkit-scrollbar-track {
		background: var(--bg);
		border-radius: 4px;
	}
	.panel__list::-webkit-scrollbar-thumb {
		background: var(--blue-m);
		border-radius: 4px;
	}

	.panel__empty {
		font-size: 13px;
		color: var(--gray);
		text-align: center;
		padding: 20px 0;
	}

	/* ── Inputs ──────────────────────────────────────────────── */
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

	.input--select {
		flex: 0 0 140px;
		cursor: pointer;
	}

	/* ── Table utilisateurs ──────────────────────────────────── */
	.table-head {
		display: grid;
		grid-template-columns: 1fr 1.5fr 1fr 1fr;
		gap: 8px;
		padding: 0 10px;
	}

	.table-head span {
		display: flex;
		justify-content: start;
		font-size: 11px;
		font-weight: 600;
		color: var(--gray);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.table-row {
		display: grid;
		grid-template-columns: 1fr 1.5fr 1fr 1fr;
		gap: 8px;
		align-items: center;
		padding: 9px 10px;
		border-radius: var(--r-md);
		background: var(--bg);
		border: 0.5px solid transparent;
		transition:
			border-color 0.15s,
			background 0.15s;
	}

	.table-row:hover {
		background: var(--blue-l);
		border-color: var(--blue-m);
	}

	.table-row__cell {
		font-size: 13px;
		color: var(--dark);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.table-row__cell--pseudo {
		color: var(--gray);
		font-size: 12px;
	}

	/* ── List rows (cours, badges, cats) ─────────────────────── */
	.list-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		padding: 10px 12px;
		border-radius: var(--r-md);
		background: var(--bg);
		border: 0.5px solid transparent;
		transition:
			border-color 0.15s,
			background 0.15s;
	}

	.list-row:hover {
		background: var(--blue-l);
		border-color: var(--blue-m);
	}

	.list-row__info {
		display: flex;
		flex-direction: column;
		gap: 4px;
		flex: 1;
		min-width: 0;
	}

	.list-row__title {
		font-size: 13px;
		font-weight: 500;
		color: var(--dark);
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.list-row__date {
		font-size: 11px;
		color: var(--gray);
		flex-shrink: 0;
	}

	.list-row--badge {
		gap: 12px;
	}

	.list-row__actions {
		display: flex;
		gap: 6px;
		flex-shrink: 0;
	}

	/* ── Badges ──────────────────────────────────────────────── */
	.badge {
		display: flex;
		justify-content: start;
		border-radius: 100px;
		font-size: 11px;
		font-weight: 600;
		white-space: nowrap;
	}

	.badge--blue {
		background: var(--blue-l);
		color: var(--blue);
		border: 0.5px solid var(--blue-m);
	}
	.badge--amber {
		background: var(--amber-l);
		color: #ba7517;
		border: 0.5px solid var(--amber-m);
	}
	.badge--green {
		background: var(--green-l);
		color: var(--green-d);
		border: 0.5px solid var(--green-m);
	}
	.badge--pink {
		background: var(--pink-l);
		color: var(--pink-d);
		border: 0.5px solid var(--pink-m);
	}

	/* Badges catégories */
	.badge--cat {
		font-size: 11px;
	}
	.badge--plomb {
		background: var(--blue-l);
		color: var(--blue);
		border: 0.5px solid var(--blue-m);
	}
	.badge--elec {
		background: var(--amber-l);
		color: #ba7517;
		border: 0.5px solid var(--amber-m);
	}
	.badge--menu {
		background: var(--green-l);
		color: var(--green-d);
		border: 0.5px solid var(--green-m);
	}
	.badge--chauf {
		background: var(--pur-l);
		color: var(--pur-d);
		border: 0.5px solid #d7bde2;
	}
	.badge--carr {
		background: var(--pink-l);
		color: var(--pink-d);
		border: 0.5px solid var(--pink-m);
	}
	.badge--peint {
		background: #f5f5f4;
		color: #57534e;
		border: 0.5px solid #d6d3d1;
	}

	/* ── Badge icône ─────────────────────────────────────────── */
	.badge-icon {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		flex-shrink: 0;
	}

	.badge-icon--amber {
		background: var(--amber-l);
		border: 2px solid var(--amber);
	}
	.badge-icon--green {
		background: var(--green-l);
		border: 2px solid #27ae60;
	}
	.badge-icon--blue {
		background: var(--blue-l);
		border: 2px solid var(--blue);
	}

	/* ── Boutons action ──────────────────────────────────────── */
	.btn-add {
		width: 28px;
		height: 28px;
		border-radius: var(--r-md);
		border: 1.5px solid var(--amber);
		background: var(--amber-l);
		color: #ba7517;
		font-size: 18px;
		font-weight: 500;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.15s;
		line-height: 1;
	}

	.btn-add:hover {
		background: var(--amber);
		color: var(--white);
	}

	.action-btn {
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
	}

	.action-btn--edit {
		background: var(--blue-l);
		color: var(--blue);
		border-color: var(--blue-m);
	}

	.action-btn--edit:hover {
		background: var(--blue);
		color: var(--white);
	}

	.action-btn--delete {
		background: var(--pink-l);
		color: var(--pink-d);
		border-color: var(--pink-m);
	}

	.delete-btn {
		background: transparent;
		border: none;
		color: var(--pink-d);
		font-size: 12px;
		cursor: pointer;
		margin-left: 8px;
	}

	.delete-btn:hover {
		color: red;
	}

	.action-btn--delete:hover {
		background: var(--pink-d);
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

		.table-head,
		.table-row {
			grid-template-columns: 1.2fr 1fr 1fr;
		}

		/* Masquer prénom sur mobile */
		.table-head span:nth-child(2),
		.table-row__cell:nth-child(2) {
			display: none;
		}

		.input--select {
			flex: 1;
		}
	}
</style>
