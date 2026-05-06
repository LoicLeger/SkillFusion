<script lang="ts">
	import '../../../../app.css';
	import LevelBar from '$lib/assets/components/Levelbar/LevelBar.svelte';
	import Category from '$lib/assets/components/Category/Category.svelte';
	import type { IUserLocalStorage } from '$lib/@types/type.localStorage';
	import { getAuth, authStore } from '$lib/services/localstorage.service.svelte';
	import { onMount } from 'svelte';

	let { isDashboard = false, ...props } = $props();
	let user: IUserLocalStorage | null = $state(null);

	onMount(() => {
		getAuth();
		user = authStore.user;
	});
</script>

<article class="cours-card {props.class}">
	<a class="cours__link" href="/cours/{props.cours.slug}">
		<div class="card__image"></div>
		<div class="card__body">
			<h3 class="card__title">{props.cours.title}</h3>
			<div class="card__information">
				<Category
					category={props.cours.category}
					--background_color={props.cours.category.backgroundColor}
				/>

				<div>
					{#if  isDashboard == true && user?.role != "student" }
						{#if props.cours.visibility == true}
							🟢
						{:else if props.cours.visibility == false}
							🔴
						{/if}
					{/if}
					<LevelBar {isDashboard} level={props.cours.difficulty} />
				</div>
			</div>
		</div></a
	>
</article>

<style>
	.cours-card {
		display: flex;
		flex-direction: row;
		position: relative;
		align-items: center;
		gap: 0;
		background: var(--background-white);
		border-radius: var(--border-radius);
		overflow: hidden;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
		border: 1px lightgray solid;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		cursor: pointer;
		width: 100%;
		min-width: 260px;
	}

	.cours-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
	}

	.cours__link {
		width: 100%;
		text-decoration: none;
	}

	.card__image {
		height: 100%;
		width: 10%;
		min-width: 10%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--card__image__color);
	}

	.card__body {
		padding: 10px 10px;
		height: 100px;
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.card__title {
		width: 100%;
		flex-grow: 1;
	}
	.card__information {
		display: flex;
		bottom: 0;
		position: relative;
		justify-content: space-between;
		align-items: flex-end;
	}

	@media (min-width: 768px) {
		.card__body {
			overflow: hidden;
		}
		.card__title {
			align-self: flex-start;
		}
	}
	@media (min-width: 1024px) {
		.cours-card {
			height: 240px;
			flex-direction: column;
			min-width: unset;
		}

		.cours__link {
			width: 100%;
			text-decoration: none;
			height: 100%;
			display: flex;
			flex-direction: column;
		}
		.card__image {
			height: 100px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--card__image__color);
		}
		.card__body {
			overflow: unset;
			padding: 10px;
			width: unset;
			flex-grow: 1;
		}
		.card__title {
			width: 100%;
		}
	}
	.coursCardDashboard {
		max-width: 15%;
		min-width: 15%;
	}
</style>
