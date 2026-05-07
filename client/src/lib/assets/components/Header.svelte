<script lang="ts">
	import logoSkillFusion from '$lib/assets/img/logo_title.png';
	import { getAuth, authStore, clearAuth } from '$lib/services/localstorage.service.svelte';
	import { onMount } from 'svelte';

	import type { IUserLocalStorage } from '$lib/@types/type.localStorage';
	import { goto } from '$app/navigation';
	import api from '$lib/services/api.service';

	let user: IUserLocalStorage | null = $state(null);

	onMount(() => {
	    getAuth();
	    user = authStore.user;
	});

	async function logout() {
	    const response = await api('auth/logout', 'POST');
	    clearAuth();
	    user = null;
	    goto('/');
	}
</script>

<header class="header">
	<!-- Logo du site  -->
	<div class="header_top">
		<a class="logo_site" href="/"> <img src={logoSkillFusion} alt="SkillFusion" /></a>
		<!-- Bouton de connxion/d'inscription -->
		<div class="header__actions">
			{#if user}
				<a href="/profil" class="header__pseudo" data-sveltekit-reload>{user.pseudo}</a>
				<button class="header__btn-logout" onclick={logout}>⏻</button>
			{:else}
				<a href="/connexion" class="header__btn-login">Connexion</a>
				<a href="/inscription" class="header__btn-register">S'inscrire</a>
			{/if}
		</div>
	</div>

	<!-- Navigation -->
	<nav class="header__nav" aria-label="Navigation principale">
		<a href="/cours" class="header__nav-link"> Nos cours </a>
		{#if user}
			<a href="/tableau-de-bord" class="header__nav-link"> Tableau de bord </a>
		{/if}
	</nav>
</header>

<style>
	.header {
		background-color: white;
		position: relative;
		--blue: #1d4e89;
		--blue-light: #ebf2fa;
		--amber: #f5a623;
		--dark: #2c3e50;
		--gray: #6b7280;
		--border: rgba(44, 62, 80, 0.1);
		--white: #ffffff;
		--radius: 10px;
		--font: 'DM Sans', sans-serif;
		border-bottom: 1px solid var(--border);
		font-family: var(--font);
		padding: 10px 20px;
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
	}
	img {
		width: 100px;
	}
	.header_top {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	/* ── Nav desktop ── */
	.header__nav {
		display: flex;
		align-items: center;
		gap: 4px;
		flex: 1;
		order: 1;
		justify-content: center;
	}
	.header__nav-link {
		padding: 8px 16px;
		border-radius: var(--radius);
		font-size: 14px;
		font-weight: 500;
		color: #1d4e89;
		text-decoration: none;
		transition:
			background 0.15s,
			color 0.15s;
		text-align: center;
		width: 70%;
	}

	.header__nav-link:hover {
		background: var(--blue-light);
		color: var(--blue);
	}

	.header__pseudo {
		text-decoration: none;
	}

	.header__actions {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
	}
	nav a {
		background-color: #ebf2fa;
	}
	.header__btn-login {
		padding: 8px 18px;
		border-radius: var(--radius);
		font-size: 14px;
		font-weight: 500;
		color: var(--blue);
		text-decoration: none;
		border: 1.5px solid var(--blue);
		background: transparent;
		transition:
			background 0.15s,
			color 0.15s;
		white-space: nowrap;
	}

	.header__btn-login:hover {
		background: var(--blue-light);
	}

	.header__btn-register {
		padding: 8px 18px;
		border-radius: var(--radius);
		font-size: 14px;
		font-weight: 500;
		color: var(--white);
		text-decoration: none;
		background: var(--amber);
		border: none;
		transition: opacity 0.15s;
		white-space: nowrap;
	}

	.header__btn-register:hover {
		opacity: 0.88;
	}

	.header__pseudo {
		font-size: 14px;
		font-weight: 600;
		color: var(--blue);
	}

	.header__btn-logout {
		padding: 8px 18px;
		border-radius: var(--radius);
		font-size: 14px;
		font-weight: 500;
		color: var(--blue);
		border: 1.5px solid var(--blue);
		background: transparent;
		cursor: pointer;
		font-family: var(--font);
		transition:
			background 0.15s,
			color 0.15s;
		white-space: nowrap;
	}

	.header__btn-logout:hover {
		background: var(--blue);
		color: white;
	}

	/* ── Responsive ── */
	@media (min-width: 768px) {
		.header__nav {
			position: absolute;
			left: 50%;
			bottom: 14px;
			transform: translateX(-50%);
		}
		.header__nav-link {
			width: auto;
		}
	}

	@media (min-width: 1024px) {
		img {
			width: 200px;
		}
	}
</style>
