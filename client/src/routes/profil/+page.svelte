<script lang="ts">
	import Footer from '$lib/assets/components/Footer.svelte';
	import Header from '$lib/assets/components/Header.svelte';
	import BtnExportRGPD from '$lib/assets/components/BtnExportRGPD.svelte';

	import BtnDeleteAccount from '$lib/assets/components/BtnDeleteAccount.svelte';
	import { onMount } from 'svelte';
	import api from '$lib/services/api.service';
	import { writable } from 'svelte/store';
	import { authStore } from '$lib/services/localstorage.service.svelte';
	import { page } from '$app/state';
	import { get } from 'svelte/store';

	let user = writable({ firstname: '', lastname: '', email: '', password: '' });

	let errorEmail = $state(false);
	let succesMessage: string | null = $state(null);

	let userId = $derived(page.url.searchParams.get('id'));

	let isSelf = $derived(!userId || userId === String(authStore.user?.id));
	let isAdmin = $derived(authStore.user?.role === 'admin');
	let isAdminViewingOther = $derived(!isSelf && authStore.user?.role === 'admin');

	onMount(async () => {
		try {
			if (userId) {
				const res = await api(`api/users/${userId}`, 'GET');
				user.set(res.data);
			} else {
				const res = await api('auth/me', 'GET');
				user.set(res.data);
			}
		} catch (e) {
			console.error(e);
		}
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const updatedUser = {
			lastname: formData.get('name'),
			firstname: formData.get('firstname'),
			email: formData.get('email'),
			password: formData.get('password')
		};

		// Supprimer les champs vides pour éviter de les envoyer à l'API
		const currentUser = get(user);

		if (!updatedUser.password) {
			delete updatedUser.password; // Ne pas inclure le champ password si il est vide
		}

		if (updatedUser.email === currentUser.email) {
			delete updatedUser.email;
		}

		if (!updatedUser.firstname) {
			delete updatedUser.firstname;
		}

		if (!updatedUser.lastname) {
			delete updatedUser.lastname;
		}

		errorEmail = false;

		try {
			const targetId = userId ?? authStore?.user?.id;

			const response = await api(`api/users/${targetId}`, 'PATCH', updatedUser);
			// Vérification du statut de la réponse
			if (response.status !== 200) {
				if (response.data.error === 'Email déjà utilisé') {
					errorEmail = true;
					setTimeout(() => (errorEmail = false), 5000); // Message effacé après 5 secondes
				}
			} else {
				errorEmail = false;
				succesMessage = 'Informations mises à jour avec succès !'; // Message de succès
				// Réinitialiser le message après quelques secondes
				setTimeout(() => (succesMessage = null), 5000); // Message effacé après 5 secondes
			}
		} catch (error) {
			console.error('Erreur lors de la mise à jour des informations utilisateur :', error);
			// Gestion d'une erreur générique
			succesMessage = 'Une erreur est survenue. Veuillez réessayer.';
		}
	}

	async function handleCancel(event) {
		event?.preventDefault();
		const currentUser = $user;
		user.set({ ...currentUser });
	}
</script>

<Header />

<div class="profil-container">
	<a class="back" href="/tableau-de-bord">⬅ Retour au tableau de bord</a>
	<h1 class="title-page">Mes informations</h1>
	{#if isAdminViewingOther}
		<p class="text-sm text-gray-500">Mode lecture admin</p>
	{/if}
	<div class="profil-wrapper">
		<form class="profil-form" onsubmit={handleSubmit}>
			<div class="form-fields">
				<div class="form-group">
					<span class="form-name">
						<label for="name">Nom </label>
						<input
							type="text"
							id="name"
							name="name"
							bind:value={$user.lastname}
							disabled={!isSelf}
							placeholder="Dupont"
						/>
					</span>
					<span class="form-firstname">
						<label for="firstname">Prénom </label>
						<input
							type="text"
							id="firstname"
							name="firstname"
							bind:value={$user.firstname}
							disabled={!isSelf}
							placeholder="Jean"
						/>
					</span>
				</div>
				<div class="form-groups">
					<span class="form-email">
						<label for="email">E-mail</label>
						<input
							type="email"
							id="email"
							name="email"
							value={$user?.email}
							disabled={!isSelf}
							placeholder="jean.dupont@email.com"
						/>
						{#if errorEmail}
							<p style="color:red;">Email déjà utilisé</p>
						{/if}
					</span>
					<span class="form-password">
						<label for="password">Mot de passe</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Modifier mon mot de passe"
							disabled={!isSelf}
						/>
					</span>
				</div>
				{#if isSelf}
					<div class="btn-modify">
						<button class="btn-update" type="submit">Enregistrer les modifications</button>
						<button class="btn-cancel" type="submit">Annuler</button>
						<BtnExportRGPD />
						<BtnDeleteAccount />
					</div>
				{/if}
				{#if succesMessage}
					<p style="color:green; font-weight: bold; margin-top: 20px;">{succesMessage}</p>
				{/if}
			</div>

			<div class="avatar-box">
				<button class="avatar-edit" type="button">✎</button>
				<div class="avatar-icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#1d4e89"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
						<circle cx="12" cy="7" r="4" />
					</svg>
				</div>
			</div>
		</form>
		<div class="badges-card">
			<h2 class="badges-title">Mes badges</h2>
			<div class="badges-list">
				<div class="badge-item">
					<div class="badge-icon badge-icon--gold">☆</div>
					<span class="badge-label">Première réalisation</span>
				</div>
				<div class="badge-item">
					<div class="badge-icon badge-icon--green">✓</div>
					<span class="badge-label">Cours terminé</span>
				</div>
				<div class="badge-item">
					<div class="badge-icon badge-icon--blue">↝</div>
					<span class="badge-label">En progression</span>
				</div>
				<div class="badge-item">
					<div class="badge-icon badge-icon--gray">☆</div>
					<span class="badge-label">À débloquer</span>
				</div>
			</div>
		</div>
	</div>
</div>

<Footer />

<style>
	:global(body) {
		background-color: #f3f0eaff;
	}

	.title-page {
		text-align: center;
		color: #1d4e89;
		margin-bottom: 20px;
	}

	.profil-container {
		max-width: 80%;
		margin: 2rem auto;
		padding: 0 1.5rem;
	}
	.form-fields {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.profil-form {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		gap: 20px;
		background-color: white;
		padding: 40px;
		border-radius: 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.profil-wrapper {
		display: block;
	}

	.form-name input,
	.form-firstname input,
	.form-email input,
	.form-password input {
		border-radius: 10px;
		padding: 10px;
		margin-bottom: 20px;
		border: 1px solid lightgray;
	}

	.form-name label,
	.form-firstname label {
		margin-bottom: 10px;
	}

	.form-firstname,
	.form-name {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.form-group {
		display: flex;
		gap: 20px;
	}

	.form-groups {
		display: flex;
		gap: 20px;
	}

	.form-email label,
	.form-password label {
		margin-bottom: 10px;
	}

	.form-email,
	.form-password {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.back {
		text-decoration: none;
		color: #1d4e89;
	}

	.btn-update {
		text-align: center;
		padding: 15px;
		cursor: pointer;
		background-color: #1d4e89;
		border-radius: 10px;
		border: none;
		color: white;
		font-weight: bold;
		margin-top: 10px;
	}

	.btn-update:hover {
		background-color: rgb(29, 78, 137, 0.8);
	}

	.btn-cancel {
		text-align: center;
		padding: 15px;
		cursor: pointer;
		background-color: white;
		border-radius: 10px;
		border: 1px solid rgb(245, 240, 240);
		color: black;
		margin-top: 10px;
		margin-left: 10px;
	}

	.btn-cancel:hover {
		background-color: rgb(245, 240, 240);
	}

	.avatar-box {
		position: relative;
		width: 110px;
		height: 110px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.avatar-icon {
		width: 100%;
		height: 100%;
		background: #e8edf5;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.2rem;
		background-color: #dbeafe;
	}

	.avatar-icon svg {
		width: 100%;
		height: 100%;
	}

	.avatar-edit {
		position: absolute;
		top: -15px;
		right: 0;
		border-radius: 10px;
		background: #fff;
		border: 1px solid #e5e7eb;
		font-size: 0.7rem;
		cursor: pointer;
		padding: 5px;
	}

	.avatar-edit:hover {
		background-color: #f3f4f6;
	}

	.badges-card {
		background: white;
		border-radius: 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		padding: 30px 40px;
		margin-top: 20px;
	}

	.badges-title {
		color: #1d4e89;
		font-size: 1rem;
		font-weight: 700;
		margin-bottom: 20px;
	}

	.badges-list {
		display: flex;
		gap: 24px;
	}

	.badge-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}

	.badge-icon {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.3rem;
		border: 2px solid;
	}

	.badge-icon--gold {
		border-color: #f59e0b;
		color: #f59e0b;
		background: #fffbeb;
	}
	.badge-icon--green {
		border-color: #22c55e;
		color: #22c55e;
		background: #f0fdf4;
	}
	.badge-icon--blue {
		border-color: #1d4e89;
		color: #1d4e89;
		background: #eff6ff;
	}
	.badge-icon--gray {
		border-color: #d1d5db;
		color: #d1d5db;
		background: #f9fafb;
	}

	.badge-label {
		font-size: 0.72rem;
		color: #6b7280;
		text-align: center;
		max-width: 60px;
		line-height: 1.3;
	}

	@media screen and (max-width: 768px) {
		.profil-form {
			flex-direction: column;
			padding: 20px;
		}

		.form-group,
		.form-groups {
			flex-direction: column;
			gap: 10px;
		}

		.form-name,
		.form-firstname,
		.form-email,
		.form-password {
			width: 100%;
		}

		.btn-modify {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		.btn-cancel {
			margin-left: 0;
		}

		.avatar-box {
			align-self: center;
			margin-top: 10px;
		}

		.badges-list {
			flex-wrap: wrap;
			justify-content: center;
			gap: 16px;
		}

		.badge-item {
			width: 70px;
		}

		.badges-card {
			padding: 20px;
		}

		.title-page {
			font-size: 1.4rem;
		}

		.profil-form {
			flex-direction: column;
		}

		.avatar-box {
			order: -1;
			align-self: center;
			margin-bottom: 20px;
		}

		.form-fields {
			order: 1;
		}
	}
</style>
